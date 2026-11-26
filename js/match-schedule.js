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
      var canvas = schedule.querySelector(".match-schedule-canvas");
      var image = document.createElement("img");
      var pdfLink = document.createElement("a");
      image.className = "match-schedule-image";
      image.alt = canvas.getAttribute("aria-label") || pdfLabel;
      image.src = pdfUrl.replace(/\.pdf$/i, ".webp");
      image.addEventListener("load", function () {
        status.hidden = true;
      });
      image.addEventListener("error", function () {
        console.error(pdfLabel + "のWebP画像を読み込めませんでした。");
        status.textContent = pdfLabel + "を表示できませんでした。";
        status.hidden = false;
      });
      pdfLink.className = "match-schedule-original";
      pdfLink.href = pdfUrl;
      pdfLink.target = "_blank";
      pdfLink.rel = "noopener";
      pdfLink.textContent = "全画面で表示";
      canvas.replaceWith(image);
      schedule.appendChild(pdfLink);
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
