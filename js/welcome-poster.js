(function () {
  "use strict";

  const STORAGE_KEY = "recreation2026-welcome-poster-seen";

  function hasBeenShown() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch (error) {
      return false;
    }
  }

  function rememberShown() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (error) {
      // Storage may be unavailable in private or restricted browsing.
    }
  }

  function createWelcomePoster() {
    if (hasBeenShown()) return;

    const overlay = document.createElement("div");
    overlay.className = "welcome-poster";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "welcomePosterTitle");

    overlay.innerHTML = `
      <div class="welcome-poster__dialog">
        <button type="button" class="welcome-poster__close" aria-label="お知らせを閉じる">&times;</button>
        <h1 id="welcomePosterTitle" class="welcome-poster__heading">
          <span>レクリエーション開催！</span>
        </h1>
        <div class="welcome-poster__image-wrap">
          <img
            class="welcome-poster__image"
            src="images/recreation-poster-2026.jpg"
            alt="RE:CREATION 2026 開催ポスター。11月27日金曜日、金城ふ頭アリーナ、9時30分から16時まで。"
          >
        </div>
        <div class="welcome-poster__actions">
          <button type="button" class="welcome-poster__enter">サイトを見る</button>
        </div>
      </div>
    `;

    const dialog = overlay.querySelector(".welcome-poster__dialog");
    const closeButton = overlay.querySelector(".welcome-poster__close");
    const enterButton = overlay.querySelector(".welcome-poster__enter");
    const previousFocus = document.activeElement;
    let closed = false;

    function closePoster() {
      if (closed) return;
      closed = true;
      rememberShown();
      overlay.classList.remove("is-visible");
      overlay.classList.add("is-closing");
      document.documentElement.classList.remove("welcome-poster-open");
      document.body.classList.remove("welcome-poster-open");
      document.removeEventListener("keydown", handleKeydown);

      window.setTimeout(function () {
        overlay.remove();
        if (previousFocus && typeof previousFocus.focus === "function") {
          previousFocus.focus();
        }
      }, 480);
    }

    function handleKeydown(event) {
      if (event.key === "Escape") {
        closePoster();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = [closeButton, enterButton];
      const currentIndex = focusable.indexOf(document.activeElement);
      event.preventDefault();

      if (event.shiftKey) {
        focusable[(currentIndex - 1 + focusable.length) % focusable.length].focus();
      } else {
        focusable[(currentIndex + 1) % focusable.length].focus();
      }
    }

    closeButton.addEventListener("click", closePoster);
    enterButton.addEventListener("click", closePoster);
    overlay.addEventListener("click", function (event) {
      if (!dialog.contains(event.target)) closePoster();
    });
    document.addEventListener("keydown", handleKeydown);

    document.body.appendChild(overlay);
    document.documentElement.classList.add("welcome-poster-open");
    document.body.classList.add("welcome-poster-open");

    window.requestAnimationFrame(function () {
      overlay.classList.add("is-visible");
      closeButton.focus();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWelcomePoster, { once: true });
  } else {
    createWelcomePoster();
  }
})();
