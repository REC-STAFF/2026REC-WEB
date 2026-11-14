(function () {
  "use strict";

  var containers = document.querySelectorAll("[data-match-schedule]");
  if (!containers.length || !window.pdfjsLib || !window.matchScheduleData) return;

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  function renderPage(schedule, page, renderTask) {
    var canvas = schedule.querySelector(".match-schedule-canvas");
    var status = schedule.querySelector(".match-schedule-status");
    if (!page || !canvas || !status) return;
    var containerWidth = schedule.clientWidth;
    if (!containerWidth) return;

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
        console.error("対戦表の描画に失敗しました。", error);
        status.textContent = "対戦表を表示できませんでした。";
        status.hidden = false;
      }
    });
  }

  Array.prototype.forEach.call(containers, function (container) {
    var key = container.getAttribute("data-match-schedule");
    var schedule = container.querySelector(".match-schedule");
    var status = schedule.querySelector(".match-schedule-status");
    var pdfUrl = window.matchScheduleData[key];
    var page;
    var renderTask = { value: null };

    if (!pdfUrl) {
      status.textContent = "対戦表の設定が見つかりませんでした。";
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
      renderPage(schedule, page, renderTask);
      window.addEventListener("resize", function () {
        renderPage(schedule, page, renderTask);
      });
    }).catch(function (error) {
      console.error("対戦表PDFの読み込みに失敗しました。", error);
      status.textContent = "対戦表を読み込めませんでした。";
    });
  });
})();
