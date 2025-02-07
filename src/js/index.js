import initBurgerBtn from "./components/burger.js";
import initSwipers from "./components/swiper-init.js";
import initShowMore from "./components/show-more.js";
import initModalCallback from "./components/modal-callback.js";

// imports init
initBurgerBtn();
initSwipers();
initShowMore();
initModalCallback();

// === start TOGGLE SCROLL === !!!!!!!!!!!!!!! DELETE ---------
let disableScroll = function () {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
  document.body.classList.add("no-scroll");
  document.body.style.paddingRight = paddingOffset;
};

let enableScroll = function () {
  document.body.classList.remove("no-scroll");
  document.body.style.paddingRight = 0;
};
// === end TOGGLE SCROLL

/* === start DROPDOWN fields ==== */
if (document.querySelector(".drop")) {
  const lists = document.querySelectorAll(".drop");
  dropList(lists);

  function dropList(els) {
    els.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("show");
        let content = e.currentTarget.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  }
}
/* === end DROPDOWN fields ==== */

// === start TAB
if (document.querySelector(".drop-head")) {
  const acc = document.getElementsByClassName("drop-head");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      if (!this.classList.contains("active")) {
        closeAccTabs();
        toggleAcc(this);
      } else {
        closeAccTabs();
      }
    });
  }

  function toggleAcc(e) {
    e.classList.toggle("active");
    var panel = e.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  function closeAccTabs() {
    for (let i = 0; i < acc.length; i++) {
      if (acc[i].classList.contains("active")) {
        acc[i].classList.remove("active");
        acc[i].nextElementSibling.removeAttribute("style");
      }
    }
  }

  // Open first accordion tab by default
  function openFirstAccTab() {
    if (!acc[0].classList.contains("active")) {
      acc[0].classList.add("active");
      acc[0].nextElementSibling.style.maxHeight =
        acc[0].nextElementSibling.scrollHeight + "px";
    }
  }

  // When resizing - auto-height adjustment
  window.addEventListener(
    "resize",
    function () {
      for (let i = 0; i < acc.length; i++) {
        if (acc[i].classList.contains("active")) {
          acc[i].nextElementSibling.style.maxHeight =
            acc[i].nextElementSibling.scrollHeight + "px";
        }
      }
    },
    true
  );
}
// === end TAB

// === start GO BY CLICK
if (document.querySelector("[data-postlink]")) {
  const allPosts = document.querySelectorAll("[data-postlink]");

  allPosts.forEach((post) => {
    post.addEventListener("click", (e) => {
      let link = e.currentTarget.dataset.postlink;
      location.href = link;
    });
  });
}
// === end RELOCATE BY CLICK

// === start ADD TO FAVORITE - HEART
const cFavs = document.querySelectorAll(".card__favorite");
if (cFavs.length > 0) {
  cFavs.forEach((cf) => {
    cf.addEventListener("click", (e) => {
      e.preventDefault();
      e.currentTarget.classList.toggle("active");
    });
  });
}
// === end ADD TO FAVORITE - HEART

// === start HIDE/SHOW BLOCKS
document.addEventListener("DOMContentLoaded", function () {
  const infoCards = document.querySelectorAll(".offices__info-card");
  let currentlyOpenCard = null;

  infoCards.forEach((card) => {
    const titleBlock = card.querySelector(".offices__info-title");
    const contentBlock = card.querySelector(".offices__info-content");
    const showButton = card.querySelector(".jsOfInfoShow");
    const hideButton = card.querySelector(".jsOfInfoHide");

    showButton.addEventListener("click", function () {
      if (currentlyOpenCard && currentlyOpenCard !== card) {
        currentlyOpenCard
          .querySelector(".offices__info-title")
          .classList.remove("hidden");
      }

      titleBlock.classList.add("hidden");
      currentlyOpenCard = card;
    });

    hideButton.addEventListener("click", function () {
      titleBlock.classList.remove("hidden");
      currentlyOpenCard = null;
    });
  });
});
// === end HIDE/SHOW BLOCKS

// === start DROP FIELD
document.addEventListener("DOMContentLoaded", function () {
  const infoCards = document.querySelectorAll(".drop__card");
  let currentlyOpenCard = null;

  infoCards.forEach((card) => {
    const titleBlock = card.querySelector(".drop__title");
    const showButton = card.querySelector(".jsDropShow");
    const hideButton = card.querySelector(".jsDropHide");
    const radioButtons = card.querySelectorAll('input[type="radio"]');

    showButton.addEventListener("click", function () {
      if (currentlyOpenCard && currentlyOpenCard !== card) {
        currentlyOpenCard
          .querySelector(".drop__title")
          .classList.remove("show");
      }

      titleBlock.classList.toggle("show");
      currentlyOpenCard = card;
    });

    hideButton.addEventListener("click", function () {
      titleBlock.classList.remove("show");
      currentlyOpenCard = null;
    });

    radioButtons.forEach((radio) => {
      radio.addEventListener("change", function () {
        if (currentlyOpenCard) {
          titleBlock.classList.remove("show");
          currentlyOpenCard = null;
        }
      });
    });
  });
});
// === end DROP FIELD

// === start DROPDOWN GROUP ASIDE
document.addEventListener("DOMContentLoaded", () => {
  const dropdownHeaders = document.querySelectorAll(".dropdown-header");

  dropdownHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const dropdownList = header.nextElementSibling;

      document.querySelectorAll(".dropdown-list").forEach((list) => {
        if (list !== dropdownList) {
          list.style.display = "none";
          list.style.maxHeight = "0";
          dropdownHeaders.forEach((el) => {
            el.classList.remove("active");
          });
        }
      });

      if (
        dropdownList.style.display === "none" ||
        dropdownList.style.display === ""
      ) {
        dropdownList.style.display = "block";
        dropdownList.style.maxHeight = dropdownList.scrollHeight + "px";
        header.classList.add("active");
      } else {
        dropdownList.style.maxHeight = "0";
        setTimeout(() => {
          dropdownList.style.display = "none";
          dropdownHeaders.forEach((el) => {
            el.classList.remove("active");
          });
        }, 430);
      }
    });
  });
});
// === end DROPDOWN GROUP ASIDE

// === start SHOW / HIDE INTERVAL
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".jsIntShow");
  if (toggleButton) {
    const titleElement = document.querySelector(".form__interval-title");
    const slideBlock = document.querySelector(".jsSlideBlock");

    toggleButton.addEventListener("click", () => {
      titleElement.classList.toggle("active");

      if (titleElement.classList.contains("active")) {
        slideBlock.style.maxHeight = slideBlock.scrollHeight + "px";
        slideBlock.style.opacity = 1;
      } else {
        slideBlock.style.maxHeight = 0;
        slideBlock.style.opacity = 0;
      }
    });
  }
});
// === end SHOW / HIDE INTERVAL
