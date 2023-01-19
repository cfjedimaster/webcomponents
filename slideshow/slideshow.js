

class SlideShow extends HTMLElement {

	constructor() {

		super();

		const shadow = this.attachShadow({mode:'open'});

		if(!this.hasAttribute('images')) {
			console.warn('slide-show called with no images');
			return;
		}

		/*
		Convert attribute into an array and do some trimming so that the end user can have some spacing
		*/
		let images = this.getAttribute('images').split(',').map(i => i.trim());
		//console.log('images',images);

		this.totalImages = images.length;

		// marker for what image to show, can be passed as an attribute, 1 based
		if(this.hasAttribute('current')) {
			console.log('they had a defined current');
			this.current = parseInt(this.getAttribute('current'), 0) - 1;
			if(this.current > this.totalImages) this.current = 0;
		} else this.current = 0;

		const wrapper = document.createElement('div');
		wrapper.innerHTML = `
		<img id="currentImage" src="${images[this.current]}">
		<p>
		<button id="prevButton">Previous</button> 
		<button id="nextButton">Next</button> 
		</p>
		`;

		this.$nextButton = wrapper.querySelector('#nextButton');
		this.$image = wrapper.querySelector('#currentImage');

		shadow.appendChild(wrapper);
		
	}

	static get observedAttributes() {
		return ['current'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log('attributeChangedCallback', name, oldValue, newValue);
		this.updateImage(newValue);
	}

	get current() {
		return this.getAttribute('current');
	}

	set current(value) {
		console.log('set current called', value);
		this.setAttribute('current', value);
		console.log('did the attribute update?', this.getAttribute('current'));
	}

	connectedCallback() {
		console.log('connected');
		this.$nextButton.addEventListener('click', this.nextImage);
	}

	nextImage() {
		console.log('do next');
		console.log('current via this?', this.current);
		console.log('current via getA', this.getAttribute('current'));
		this.current++;
	}

	updateImage(idx) {
		console.log('updateImage called', idx);
		this.image = this.images[idx];
	}
}

customElements.define('slide-show', SlideShow);