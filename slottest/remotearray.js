
class RemoteArray extends HTMLElement {

	constructor() {

		super();

		const shadow = this.attachShadow({mode:'open'});
		if(this.hasAttribute('url')) {
			this.url = this.getAttribute('url');
		} else console.warn('No URL passed to remote-array, I will do nothing, but I\'ll do it fast!');

		const div = document.createElement('div');
		div.innerHTML = `
		<style>
		:host {
			background-color: red;
		}
		</style>
		<slot></slot>
		`;

		shadow.appendChild(div);


	}

	async connectedCallback() {
		console.log('connected callback');

		// first, fetch my shit
		console.log(this.url);
		let req = await fetch(this.url);
		let data = await req.json();
		console.log(data);

		let template = this.querySelector('div').innerHTML;
		let result = '';

		data.forEach(d => {
			let recordHTML = template;
			for(let key in d) {
				let token = `{{${key}}}`;
				recordHTML = recordHTML.replace(token, d[key]);
				//console.log('look for '+key+ ' in my template', template);
			}
			result += recordHTML;
		});
		
		console.log('--------------------');
		console.log(result);

		this.querySelector('div').innerHTML = result;
	}
}

customElements.define('remote-array', RemoteArray);