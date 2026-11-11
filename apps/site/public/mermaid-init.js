// Renders <pre class="mermaid"> blocks and follows Starlight's light/dark theme.
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@12.2.0/dist/mermaid.esm.min.mjs';

const blocks = [...document.querySelectorAll('pre.mermaid')];
const sources = blocks.map((el) => el.textContent);

async function render() {
	if (!blocks.length) return;
	const dark = document.documentElement.dataset.theme === 'dark';
	mermaid.initialize({ startOnLoad: false, theme: dark ? 'dark' : 'default', securityLevel: 'strict' });
	blocks.forEach((el, i) => {
		el.removeAttribute('data-processed');
		el.textContent = sources[i];
	});
	await mermaid.run({ nodes: blocks });
}

render();
new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
