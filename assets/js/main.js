const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
(function () {
  //pwa
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }

  // header shadow: header--active
  const HEADER_ACTIVE = "header--active";
  const header = $("#header");
  window.addEventListener("scroll", function () {
    const pageOffsetY = window.pageYOffset;
    header.classList[pageOffsetY > 0 ? "add" : "remove"](HEADER_ACTIVE);
  });

  // moblie:  button toggle menu
  const toggleBtn = $(".toggle-btn");
  const mobileNavigation = $(".mobile-navigation");
  toggleBtn.addEventListener("click", function () {
    toggleBtn.classList.toggle("active");
    mobileNavigation.classList.toggle("active");
  });

  // tabs
  // active tab link
  const tabs = $$(".tab__item");
  const tabContents = $$(".tab-content__item");
  const tabLine = $(".tab__line");
  const activeTabClassname = "tab__item--active";

  const removeStateActiveTab = () => {
    tabs.forEach((tab) => {
      tab.classList.remove(activeTabClassname);
    });
  };

  const hiddenAllTabContent = () => {
    tabContents.forEach((tabContent) => {
      tabContent.classList.add("hidden");
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      removeStateActiveTab();
      tab.classList.add(activeTabClassname);

      const tabIndex = +tab.getAttribute("data-index");
      tabLine.style.top = tabLine.offsetHeight * tabIndex + "px";

      hiddenAllTabContent();
      const activeTabcontent = $(
        `.tab-content__item[data-index="${tabIndex}"]`
      );
      activeTabcontent.classList.remove("hidden");
    });
  });
})();
