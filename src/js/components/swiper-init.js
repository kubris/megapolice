const initSwipers = () => {
  if (document.querySelector(".x-slider")) {
		const xSlider = new Swiper(".x-slider", {
			loop: true,
			slidesPerView: 2.2,
			spaceBetween: 0,
	
			navigation: {
				nextEl: ".x-slider-next",
				prevEl: ".x-slider-prev",
			},
	
			breakpoints: {
				300: {
					slidesPerView: 2.2,
				},
				1024: {
					slidesPerView: 4,
				},
			},
		});
	}
};

export default initSwipers;
