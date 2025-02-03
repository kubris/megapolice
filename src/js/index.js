import initBurgerBtn from './components/burger.js';
import initSwipers from './components/swiper-init.js';
import initShowMore from './components/show-more.js';
import initModalCallback from './components/modal-callback.js';

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
