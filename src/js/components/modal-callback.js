import Scroll from "./class-toggle-scroll.js";

const initModalCallback = () => {
  if (document.querySelector(".callback-bg")) {
    const modalBg = document.querySelector(".callback-bg");
    const modalWin = document.querySelector(".callback");
    const closeWin = document.querySelector(".callback-close");

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("jsOpenModal")) {
        modalBg.classList.add("show");
        Scroll.off();
      }

      if (event.target === closeWin) {
        modalBg.classList.remove("show");
        Scroll.on();
      }

      if (
        modalBg.classList.contains("show") &&
        modalBg.contains(event.target) &&
        event.target !== closeWin &&
        !modalWin.contains(event.target)
      ) {
        modalBg.classList.remove("show");
        Scroll.on();
      }
    });
  }
};

export default initModalCallback;
