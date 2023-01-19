

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
		if(this.hasAttribute('currentImage')) {
			console.log('they had a defined currentImage');
			this.currentImage = parseInt(this.getAttribute('currentImage'), 0) - 1;
			if(this.currentImage > this.totalImages) this.currentImage = 0;
		} else this.currentImage = 0;

		console.log('wtaf',this.currentImage);
		const wrapper = document.createElement('div');
		wrapper.innerHTML = `
		<img id="currentImage" src="${images[this.currentImage]}">
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
		console.log('get observeredAttributes called');
		return ['currentImage'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log('attributeChangedCallback', name, oldValue, newValue);
		this.updateImage(newValue);
	}

	set currentImage(value) {
		//console.log('set currentImage called', value);
		this.setAttribute('currentImage', value);
		//console.log('did the attribute update?', this.getAttribute('currentImage'));
	}

	connectedCallback() {
		console.log('connected');
		this.currentImage = 1;
		this.$nextButton.addEventListener('click', this.nextImage);
	}

	nextImage() {
		console.log('do next');
		console.log('currentImage via this?', this.currentImage);
		console.log('currentImage via getA', this.getAttribute('currentImage'));
		this.currentImage ++;
		//this.setAttribute('currentImage', this.getAttribute('currentImage') + 1);

	}

	updateImage(idx) {
		console.log('updateImage', idx);
		this.image = this.images[idx];
	}
}

customElements.define('slide-show', SlideShow);