

class SlideShow extends HTMLElement {

	constructor() {

		super();

		const shadow = this.attachShadow({mode:'open'});

		if(!this.hasAttribute('images')) {
			console.warn('slide-show called with no images');
			return;
		}

		if(!this.hasAttribute('width')) {
			// default
			this.setAttribute('width', 500);
		}

		/*
		Convert attribute into an array and do some trimming so that the end user can have some spacing
		*/
		this.images = this.getAttribute('images').split(',').map(i => i.trim());
		//console.log('images',images);
		
		// preload for quicker response, we don't need to wait for this
		this.preload(this.images);

		this.totalImages = this.images.length;

		this.current = 0;

		const wrapper = document.createElement('div');
		
		wrapper.innerHTML = `
		<img id="currentImage" src="${this.images[this.current]}">
		<p>
		<button id="prevButton">Previous</button> 
		Picture <span id="currentPicture">1</span> of ${this.totalImages}
		<button id="nextButton">Next</button> 
		</p>
		`;

		this.$nextButton = wrapper.querySelector('#nextButton');
		this.$prevButton = wrapper.querySelector('#prevButton');
		this.$currentPicture = wrapper.querySelector('#currentPicture');
		this.$image = wrapper.querySelector('#currentImage');
		
		const style = document.createElement('style');
		style.innerHTML = `
div {
	width: ${this.getAttribute('width')}px
}
p {
text-align: center;
}
		`;
		shadow.appendChild(wrapper);
		shadow.appendChild(style);
		
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
		this.$currentPicture.innerText = this.current+1;
	}

	preload(i) {
		for(let x=0; x<i.length; x++) {
			let img = new Image();
			img.src = i[x];
		}
	}
}

customElements.define('slide-show', SlideShow);