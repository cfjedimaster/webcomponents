

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
		this.images = this.getAttribute('images').split(',').map(i => i.trim());
		//console.log('images',images);

		this.totalImages = this.images.length;

		this.current = 0;

		const wrapper = document.createElement('div');
		
		wrapper.innerHTML = `
		<img id="currentImage" src="${this.images[this.current]}">
		<p>
		<button id="prevButton">Previous</button> 
		<button id="nextButton">Next</button> 
		</p>
		`;

		this.$nextButton = wrapper.querySelector('#nextButton');
		this.$prevButton = wrapper.querySelector('#prevButton');
		this.$image = wrapper.querySelector('#currentImage');
		

		shadow.appendChild(wrapper);
		
	}
	connectedCallback() {
		console.log('connected');
		this.$nextButton.addEventListener('click', this.nextImage.bind(this));
		this.$prevButton.addEventListener('click', this.prevImage.bind(this));
	}

	nextImage() {
		if(this.current+1 == this.totalImages) return; 
		this.current++;
		this.updateImage();
	}

	prevImage() {
		if(this.current == 0) return; 
		this.current--;
		this.updateImage();
	}

	updateImage() {
		console.log('updateImage called');
		console.log('current is', this.current);
		this.$image.src = this.images[this.current];
	}
}

customElements.define('slide-show', SlideShow);