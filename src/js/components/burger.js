import Scroll from './class-toggle-scroll.js';

const initBurgerBtn = () => {
  const burgerButton = document.querySelector("#burger");

  if (burgerButton) {
    const mobileMenu = document.querySelector(".mobile-menu");

    burgerButton.onclick = (event) => {
      event.preventDefault();

      burgerButton.classList.toggle("active");
      Scroll.toggle();

      if (mobileMenu) {
        mobileMenu.classList.toggle("show");
      }
    };
  }
};

export default initBurgerBtn;
