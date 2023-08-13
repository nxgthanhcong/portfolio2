const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const helper = {
  delay: (msSecond) =>
    new Promise((resolve) => {
      setTimeout(resolve, msSecond);
    }),
};

(function () {
  document.addEventListener("DOMContentLoaded", async () => {
    const fadeTypes = ["fadedown-enter", "fadeup-enter", "fade-enter"];
    const findType = (elClasses) => {
      let rs = "";
      elClasses.forEach((d) => {
        if (fadeTypes.includes(d)) {
          rs = d;
        }
      });
      return rs;
    };

    const animateElement = async (selector, delay, transitionDelay = 0) => {
      debugger;

      const elements = $$(selector);
      elements.forEach((el, index) => {
        const fadeType = findType(el.classList);
        const orginClass = el.getAttribute("class");

        el.setAttribute(
          "class",
          orginClass.replace(fadeType, fadeType + "-active")
        );
        transitionDelay > 0 &&
          (el.style.transitionDelay = index * transitionDelay + "ms");
      });
      await helper.delay(delay);
    };

    const arrFunctions = [
      {
        name: "hand-loading",
        function: async () => {
          $(".hand-loading").style.animationDelay = `${3250}ms`;
          await helper.delay(3250);
        },
      },
      {
        name: "logo-fade",
        function: async () => {
          await animateElement(".logo.fadedown-enter", 300);
        },
      },
      {
        name: "menu-item-fade",
        function: async () => {
          await animateElement(".pc-navigation__item.fadedown-enter", 600, 100);
        },
      },
      {
        name: "home-section-fade",
        function: async () => {
          await animateElement(".home-section .fadeup-enter", 700, 100);
        },
      },
      {
        name: "information-vertical-fade",
        function: async () => {
          await animateElement(
            ".home-section .fade-enter, .information-vertical.fade-enter",
            300
          );
        },
      },
    ];

    const isSmallScreen = window.innerWidth < 1024;
    const animationsToRun = isSmallScreen
      ? arrFunctions.filter((fn) => fn.name !== "menu-item-fade")
      : arrFunctions;

    for (
      let index = 0, length = animationsToRun.length;
      index < length;
      index++
    ) {
      await arrFunctions[index].function();
    }
  });

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
