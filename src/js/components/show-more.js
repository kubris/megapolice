const initShowMore = () => {
  if (document.querySelector(".jsShowMore")) {
		const readMoreBtns = document.querySelectorAll(".jsShowMore");
	
		readMoreBtns.forEach((rmBtn) => {
			rmBtn.addEventListener("click", (e) => {
				e.currentTarget.previousElementSibling.classList.toggle("open");
			});
		});
	}
};

export default initShowMore;
