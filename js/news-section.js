(function () {
  "use strict";

  const newsList = document.getElementById("news-list");
  const newsItems = window.RECREATION_NEWS;

  if (!newsList || !Array.isArray(newsItems)) return;

  function createTag(tag) {
    const element = document.createElement("span");
    element.className = tag.className;
    element.textContent = tag.label;
    return element;
  }

  function createNewsItem(item) {
    const element = document.createElement(item.href ? "a" : "div");
    element.className = item.href ? "news-item news-item-link" : "news-item news-item-static";

    if (item.href) {
      element.href = item.href;
    }

    item.tags.forEach(function (tag) {
      element.appendChild(createTag(tag));
    });

    const date = document.createElement("time");
    date.className = "news-date";
    date.dateTime = item.dateTime;
    date.textContent = item.dateLabel;
    element.appendChild(date);

    const text = document.createElement("p");
    text.className = "news-text";
    text.textContent = item.text;
    element.appendChild(text);

    if (item.href) {
      const arrow = document.createElement("i");
      arrow.dataset.lucide = "arrow-right";
      arrow.className = "news-arrow-icon";
      arrow.style.cssText = "width: 18px; height: 18px;";
      element.appendChild(arrow);
    }

    return element;
  }

  newsList.replaceChildren();

  newsItems.forEach(function (item) {
    newsList.appendChild(createNewsItem(item));
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
})();
