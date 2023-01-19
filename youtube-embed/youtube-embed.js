class YoutubeEmbed extends HTMLElement {

	constructor() {

		super();

		const shadow = this.attachShadow({mode:'open'});

		this.width = 560;
		this.height = 315;
		this.title = '';
		this.videoid = null;

		if(this.hasAttribute('width')) this.width = parseInt(this.getAttribute('width'), 10);
		if(this.hasAttribute('height')) this.height = parseInt(this.getAttribute('height'), 10);
		if(this.hasAttribute('title')) this.title = this.getAttribute('title');
		if(this.hasAttribute('videoid')) {
			this.videoid = this.getAttribute('videoid');
		} else {
			console.warn('No videoid passed to youtube-embed tag, aborting.');
			return;
		}

		const div = document.createElement('div');
		div.innerHTML = `
<iframe
  width="${this.width}"
  height="${this.height}"
  src="https://www.youtube.com/embed/${this.videoid}"
  srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${this.videoid}?autoplay=1><img src=https://img.youtube.com/vi/${this.videoid}/hqdefault.jpg alt='${this.title}' title='${this.title}'><span>▶</span></a>"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  title="${this.title}"
></iframe>

`;
		shadow.appendChild(div);
	}
}

customElements.define('youtube-embed', YoutubeEmbed);