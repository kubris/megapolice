const initSwipers = () => {
  if (document.querySelector(".brands__slider")) {
		const xSlider = new Swiper(".brands__slider", {
			loop: true,
			slidesPerView: 2,
			spaceBetween: 5,
	
			breakpoints: {
				768: {
					slidesPerView: 5,
					spaceBetween: 8,
				},
				1024: {
					slidesPerView: 7,
					spaceBetween: 14,
				},
			},
		});
	}
};

export default initSwipers;
