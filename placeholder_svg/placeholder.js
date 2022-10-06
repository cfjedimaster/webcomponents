/*
credit:
for dynamic svg, https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/
for centered text, https://stackoverflow.com/questions/5546346/how-to-place-and-center-text-in-an-svg-rectangle
*/

const ns = 'http://www.w3.org/2000/svg';

class PlaceHolder extends HTMLElement {

	constructor() {

		super();

		const shadow = this.attachShadow({mode:'open'});

		this.width = 250;
		this.height = 250;
		this.bgcolor = '#c0c0c0';

		if(this.hasAttribute('width')) this.width = parseInt(this.getAttribute('width'), 10);
		if(this.hasAttribute('height')) this.height = parseInt(this.getAttribute('height'), 10);
		if(this.hasAttribute('bgcolor')) this.bgcolor = this.getAttribute('bgcolor');

		const wrapper = document.createElementNS(ns, 'svg');
		wrapper.setAttribute('width', this.width);
		wrapper.setAttribute('height', this.height);
		wrapper.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);

		const rect = document.createElementNS(ns, 'rect');
		rect.setAttribute('width', '100%');
		rect.setAttribute('height', '100%');
		rect.setAttribute('fill', this.bgcolor);
		wrapper.appendChild(rect);

		if(this.getAttribute('text')) {
			const text = document.createElementNS(ns, 'text');
			text.setAttribute('x', '50%');
			text.setAttribute('y', '50%');
			text.setAttribute('dominant-baseline', 'middle');
			text.setAttribute('text-anchor', 'middle');
			text.textContent = this.getAttribute('text');
			wrapper.appendChild(text);
		}

		shadow.appendChild(wrapper);
	}
}

customElements.define('place-holder', PlaceHolder);