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

// === start SLIDER FOR GOODS
const swThumbs = document.querySelector(".slider__thumbs .swiper-container");
const swImages = document.querySelector(".slider__images .swiper-container");
if (swThumbs && swImages) {
  const sliderThumbs = new Swiper(".slider__thumbs .swiper-container", {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 5,
    navigation: {
      nextEl: ".slider__next",
      prevEl: ".slider__prev",
    },
    freeMode: true,
    breakpoints: {
      0: {
        enabled: false,
      },
      575: {
        direction: "vertical",
        enabled: true,
      },
    },
  });

  const sliderImages = new Swiper(".slider__images .swiper-container", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 10,
    mousewheel: true,
    navigation: {
      nextEl: ".slider__next",
      prevEl: ".slider__prev",
    },
    grabCursor: true,
    thumbs: {
      swiper: sliderThumbs,
    },
    breakpoints: {
      0: {
        direction: "horizontal",
      },
      575: {
        direction: "vertical",
      },
    },
  });
}
// === end SLIDER FOR GOODS

// === start QUANTITY
const productAmountElement = document.querySelector(".product__amount");

if (productAmountElement) {
  const basePriceElement = productAmountElement.querySelector(".jsPanCost");
  const oldPriceElement = productAmountElement.querySelector(".jsPanOld");
  const originalPrice = parseFloat(basePriceElement.innerText) || 0;
  const priceCoefficient =
    parseFloat(oldPriceElement.innerText) / originalPrice || 1;

  function updatePrice() {
    const quantityInput =
      productAmountElement.querySelector(".quantity__field");
    const count = parseInt(quantityInput.value) || 1;
    const selectedRadio = document.querySelector(
      ".product__amount-btns input[type='radio']:checked"
    );

    if (selectedRadio) {
      const coefficient = parseFloat(selectedRadio.value);
      const newPrice = originalPrice * coefficient * count;
      basePriceElement.innerHTML = `${newPrice.toFixed(2)} ₽`;
      oldPriceElement.innerHTML = `${(newPrice * priceCoefficient).toFixed(
        2
      )} ₽`;
    }
  }

  document
    .querySelectorAll(".product__amount-btns input[type='radio']")
    .forEach((radio) => {
      radio.addEventListener("change", updatePrice);
    });

  document
    .querySelectorAll(".quantity__minus, .quantity__plus")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const quantityInput =
          button.parentElement.querySelector(".quantity__field");
        let count = Math.max(
          1,
          parseInt(quantityInput.value) +
            (button.classList.contains("quantity__plus") ? 1 : -1)
        );
        quantityInput.value = count;
        updatePrice();
      });
    });

  document.querySelectorAll(".quantity__field").forEach((input) => {
    input.addEventListener("input", function () {
      this.value = Math.max(1, this.value.replace(/[^0-9]/g, "")) || 1;
      const maxCount = parseInt(this.dataset.maxCount) || Infinity;
      this.value = Math.min(parseInt(this.value), maxCount) || 1;
      updatePrice();
    });
  });

  updatePrice();
}
// === end QUANTITY

// === start TESTIMONIALS SLIDER
const tSl = document.querySelector(".testimonials__slider");
if (tSl) {
  const testiSlider = new Swiper(tSl, {
    slidesPerView: 1,
    spaceBetween: 14,
    loop: true,
    navigation: {
      nextEl: ".testimonials__slider-next",
      prevEl: ".testimonials__slider-prev",
    },
    breakpoints: {
      575: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}
// === end TESTIMONIALS SLIDER

// === start CART ITEM - CALCULATE
// -- Скрипт не учитывает динамического добавления элементов, только переход в корзину с уже готовым набором товаров. 
// -- При удалении товара из корзины всё работает хорошо.
document.addEventListener('DOMContentLoaded', () => {
  const priceElements = document.querySelectorAll('.cart-goods__price');

  if (priceElements.length > 0) {
    const carts = document.querySelectorAll('.quantity__cart');

    carts.forEach(cart => {
      const quantityField = cart.querySelector('.quantity__field');
      const priceElement = cart.closest('.cart-goods__info').querySelector('.cart-goods__price');
      const basePrice = parseFloat(priceElement.textContent.replace(/[^\d.-]/g, ''));

      function updatePrice() {
        const quantity = parseInt(quantityField.value, 10);
        const totalPrice = quantity * basePrice;
        priceElement.textContent = `${totalPrice.toFixed(2)} ₽`;
      }

      function changeQuantity(amount) {
        let quantity = parseInt(quantityField.value, 10);
        const maxCount = parseInt(quantityField.dataset.maxCount, 10);
        let changed = false;

        quantity += amount;

        if (quantity < 1) quantity = 1;
        if (quantity > maxCount) quantity = maxCount;
        if (quantity !== parseInt(quantityField.value, 10)) changed = true;

        quantityField.value = quantity;
        if (changed) updatePrice();
      }

      let isButtonPressed = false;
      let interval;
      let timeout;

      cart.querySelector('.quantity__minus').addEventListener('mousedown', () => {
        isButtonPressed = true;
        changeQuantity(-1);
        timeout = setTimeout(() => {
          interval = setInterval(() => {
            if (isButtonPressed) changeQuantity(-1);
          }, 100);
        }, 500);
      });

      cart.querySelector('.quantity__plus').addEventListener('mousedown', () => {
        isButtonPressed = true;
        changeQuantity(1);
        timeout = setTimeout(() => {
          interval = setInterval(() => {
            if (isButtonPressed) changeQuantity(1);
          }, 100);
        }, 500);
      });

      document.addEventListener('mouseup', () => {
        isButtonPressed = false;
        clearInterval(interval);
        clearTimeout(timeout);
      });
      document.addEventListener('mouseleave', () => {
        isButtonPressed = false;
        clearInterval(interval);
        clearTimeout(timeout);
      });

      updatePrice();
    });
  }
});
// === end CART ITEM - CALCULATE

// === start SHOW BYTTON - ORDER
const showMore = document.querySelectorAll(".jsShowBtn");
if (showMore.length > 0) {
	showMore.forEach((sm) => {
		sm.addEventListener("click", (e) => {
			e.currentTarget.parentElement.classList.toggle("show");
			e.currentTarget.classList.toggle("show");
		});
	});
}
// === end SHOW BYTTON - ORDER

// === start TABS - LK
const TabManager = {
	fadeIn(el, timeout, display = "block") {
			el.style.opacity = 0;
			el.style.display = display;
			el.style.transition = `opacity ${timeout}ms`;
			setTimeout(() => { el.style.opacity = 1; }, 10);
	},

	fadeOut(el, timeout) {
			el.style.opacity = 1;
			el.style.transition = `opacity ${timeout}ms`;
			el.style.opacity = 0;
			setTimeout(() => { el.style.display = "none"; }, timeout);
	},

	hideAll(els) {
			els.forEach(item => item.style.display = "none");
	},

	delAllActiveBtns(els) {
			els.forEach(item => item.classList.remove("active"));
	},

	init(btnClass, blockClass) {
			const btns = document.querySelectorAll(btnClass);
			const blocks = document.querySelectorAll(blockClass);
			
			if (btns.length && blocks.length) {
					this.hideAll(blocks);
					blocks[0].style.display = "block";

					btns.forEach(btn => {
							btn.addEventListener("click", (e) => {
									const currBlock = document.querySelector(`[data-cnt="${e.currentTarget.dataset.tb}"]`);

									this.delAllActiveBtns(btns);
									e.currentTarget.classList.add("active");
									this.hideAll(blocks);

									if (currBlock) {
											this.fadeIn(currBlock, 1000);
									}
							});
					});
			} else {
					console.error("No buttons or no blocks found!");
			}
	}
};

document.addEventListener("DOMContentLoaded", () => TabManager.init('.tabBtn', '.tabData'));
// === end TABS - LK
