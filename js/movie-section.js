(function () {
  "use strict";

  const config = window.RECREATION_MOVIE_CONFIG;
  const section = document.getElementById("movie-section");

  if (!config || !section) return;

  const content = config.contents && config.contents[config.mode];
  if (!content) {
    console.error("Movie content is not configured:", config.mode);
    return;
  }

  const heading = section.querySelector(".section-heading");
  const subheading = section.querySelector(".section-subheading");
  const iframe = section.querySelector("iframe");

  if (!heading || !subheading || !iframe) {
    console.error("Movie section markup is incomplete.");
    return;
  }

  heading.lastChild.textContent = ` ${content.heading}`;
  subheading.textContent = content.subheading;
  iframe.src = content.src;
  iframe.title = content.title;
})();
