// -- desable/enable scroll action from <HTML>
const Scroll = {
  htmlTag: document.body.parentElement,
  off: function () {
    if (this.htmlTag) {
      this.htmlTag.classList.add("no-scroll");
    }
  },
  on: function () {
    if (this.htmlTag && this.htmlTag.classList.contains("no-scroll")) {
      if (this.htmlTag.classList.length > 1) {
        this.htmlTag.classList.remove("no-scroll");
      } else if (this.htmlTag.classList.length === 1) {
        this.htmlTag.removeAttribute("class");
      }
    }
  },
  toggle: function () {
		let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
    if (this.htmlTag) {
      if (this.htmlTag.classList.contains("no-scroll")) {
        if (this.htmlTag.classList.length > 1) {
          this.htmlTag.classList.remove("no-scroll");
					document.body.style.paddingRight = 0;
        } else if (this.htmlTag.classList.length === 1) {
          this.htmlTag.removeAttribute("class");
					document.body.style.paddingRight = 0;
        }
      } else {
        this.htmlTag.classList.add("no-scroll");
				document.body.style.paddingRight = paddingOffset;
      }
    } else {
      console.warn('Some bug is here for about  "html.no-sroll" ');
    }
  },
};

export default Scroll;
