(function () {
  "use strict";

  var containers = document.querySelectorAll("[data-match-schedule]");
  if (!containers.length || !window.pdfjsLib || !window.matchScheduleData) return;

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  function renderPage(schedule, page, renderTask, pdfLabel) {
    var canvas = schedule.querySelector(".match-schedule-canvas");
    var status = schedule.querySelector(".match-schedule-status");
    if (!page || !canvas || !status) return;
    var containerWidth = schedule.clientWidth;
    if (!containerWidth || renderTask.width === containerWidth) return;
    renderTask.width = containerWidth;

    var baseViewport = page.getViewport({ scale: 1 });
    var scale = containerWidth / baseViewport.width;
    var viewport = page.getViewport({ scale: scale });
    var outputScale = window.devicePixelRatio || 1;
    var context = canvas.getContext("2d");

    if (renderTask.value) renderTask.value.cancel();

    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = Math.floor(viewport.width) + "px";
    canvas.style.height = Math.floor(viewport.height) + "px";

    renderTask.value = page.render({
      canvasContext: context,
      viewport: viewport,
      transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null
    });

    renderTask.value.promise.then(function () {
      status.hidden = true;
      renderTask.value = null;
    }).catch(function (error) {
      if (error.name !== "RenderingCancelledException") {
        console.error(pdfLabel + "の描画に失敗しました。", error);
        status.textContent = pdfLabel + "を表示できませんでした。";
        status.hidden = false;
      }
    });
  }

  Array.prototype.forEach.call(containers, function (container) {
    var key = container.getAttribute("data-match-schedule");
    var schedule = container.querySelector(".match-schedule");
    var status = schedule.querySelector(".match-schedule-status");
    var pdfLabel = container.getAttribute("data-pdf-label") || "対戦表";
    var pdfUrl = window.matchScheduleData[key];
    var page;
    var renderTask = { value: null };

    if (!pdfUrl) {
      status.textContent = pdfLabel + "の設定が見つかりませんでした。";
      return;
    }

    if (/-rules$|-meeting$/.test(key)) {
      var isMobile = window.matchMedia("(max-width: 768px)").matches;
      var canvas = schedule.querySelector(".match-schedule-canvas");
      var frame = document.createElement("iframe");
      frame.className = "match-schedule-pdf";
      frame.title = canvas.getAttribute("aria-label") || pdfLabel;
      frame.src = pdfUrl + "#toolbar=0&navpanes=0&view=" + (isMobile ? "Fit" : "FitH");
      frame.style.display = "block";
      frame.style.width = "100%";
      frame.style.height = "auto";
      frame.style.aspectRatio = "16 / 9";
      frame.style.border = "0";

      if (isMobile) {
        frame.addEventListener("load", function () {
          var frameDocument = frame.contentDocument;
          var pageImage = frameDocument && frameDocument.querySelector("img");
          if (!pageImage) return;

          pageImage.style.display = "block";
          pageImage.style.width = "100%";
          pageImage.style.height = "auto";
        });

        pdfjsLib.getDocument({
          url: pdfUrl,
          useSystemFonts: true,
          disableFontFace: true
        }).promise.then(function (pdf) {
          return pdf.getPage(1);
        }).then(function (firstPage) {
          var viewport = firstPage.getViewport({ scale: 1 });
          frame.style.aspectRatio = viewport.width + " / " + viewport.height;
          canvas.replaceWith(frame);
          status.hidden = true;
        }).catch(function (error) {
          console.error(pdfLabel + "の表示サイズ取得に失敗しました。", error);
          status.textContent = pdfLabel + "を表示できませんでした。";
          status.hidden = false;
        });
        return;
      }

      canvas.replaceWith(frame);
      status.hidden = true;
      return;
    }

    pdfjsLib.getDocument({
      url: pdfUrl,
      useSystemFonts: true,
      disableFontFace: true
    }).promise.then(function (pdf) {
      return pdf.getPage(1);
    }).then(function (loadedPage) {
      page = loadedPage;
      renderPage(schedule, page, renderTask, pdfLabel);
      window.addEventListener("resize", function () {
        renderPage(schedule, page, renderTask, pdfLabel);
      });
    }).catch(function (error) {
      console.error(pdfLabel + "の読み込みに失敗しました。", error);
      status.textContent = pdfLabel + "を読み込めませんでした。";
    });
  });
})();
