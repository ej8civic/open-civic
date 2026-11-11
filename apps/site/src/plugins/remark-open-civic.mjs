// Adapts the repo's GitHub-flavoured docs/ markdown for the Starlight site:
//  1. Drops the page's first H1 (Starlight already renders the frontmatter title).
//  2. Rewrites relative links: docs/*.md -> site URL, other repo files -> GitHub.
//  3. Turns ```mermaid blocks into <pre class="mermaid"> for client-side rendering.
import { visit, SKIP } from 'unist-util-visit';
import path from 'node:path';

const REPO = 'https://github.com/ej8civic/open-civic/blob/main';

const slugify = (p) =>
	p.split('/').map((s) => s.toLowerCase().replace(/[^a-z0-9._-]+/g, '-')).join('/');

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default function remarkOpenCivic({ repoRoot, base }) {
	const docsRoot = path.join(repoRoot, 'docs');
	const siteBase = base.replace(/\/$/, '');

	return (tree, file) => {
		// 1. first H1
		const h1 = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 1);
		if (h1 !== -1) tree.children.splice(h1, 1);

		// 2. links
		const from = file.path ? path.dirname(file.path) : docsRoot;
		visit(tree, ['link', 'definition'], (node) => {
			const url = node.url;
			if (!url || /^([a-z]+:|#|\/)/i.test(url)) return;
			const [target, hash = ''] = url.split('#');
			const abs = path.resolve(from, decodeURIComponent(target));
			const relDocs = path.relative(docsRoot, abs).split(path.sep).join('/');
			const anchor = hash ? `#${hash}` : '';
			if (!relDocs.startsWith('..') && /\.mdx?$/.test(relDocs) && !/README\.md$/.test(relDocs)) {
				const slug = slugify(relDocs.replace(/\.mdx?$/, '').replace(/(^|\/)index$/, ''));
				node.url = `${siteBase}/${slug}${slug ? '/' : ''}${anchor}`;
			} else {
				const relRepo = path.relative(repoRoot, abs).split(path.sep).join('/');
				if (!relRepo.startsWith('..')) node.url = `${REPO}/${relRepo}${anchor}`;
			}
		});

		// 3. mermaid
		visit(tree, 'code', (node, index, parent) => {
			if (node.lang !== 'mermaid' || !parent) return;
			parent.children[index] = { type: 'html', value: `<pre class="mermaid">${escapeHtml(node.value)}</pre>` };
			return SKIP;
		});
	};
}
