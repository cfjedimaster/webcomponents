
class SlotOne extends HTMLElement {

	constructor() {

		super();

		const shadow = this.attachShadow({mode:'open'});
		/*
		const wrapper = document.createElement('div');
		const header = document.createElement('h1');
		header.innerText = 'Header';
		wrapper.appendChild(header);

		const s = document.createElement('slot');
		s.name = 'testslot';
		wrapper.appendChild(s);

		const footer = document.createElement('h3');
		footer.innerText = 'Footer';
		wrapper.appendChild(footer);
		*/

		const div = document.createElement('div');
		div.innerHTML = `
<h1>I'm a header</h1>
<p>Here's my slot: <slot name="testslot">default</p>
<h2>I'm a footer.</h2>
`;


		shadow.appendChild(div);


	}

	connectedCallback() {
		console.log('c callback');
		// remove
		//var video2 = this.shadowRoot.querySelector( 'slot' ).assignedNodes()[0].innerText;
		//console.log(video2);
	}
}

customElements.define('slot-one', SlotOne);