// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fileURLToPath } from 'node:url';
import remarkOpenCivic from './src/plugins/remark-open-civic.mjs';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const base = '/open-civic';

/** One sidebar group per docs/ section folder. */
const section = (label, directory) => ({ label, items: [{ autogenerate: { directory } }] });

export default defineConfig({
	site: 'https://ej8civic.github.io',
	base,
	trailingSlash: 'always',
	markdown: {
		remarkPlugins: [[remarkOpenCivic, { repoRoot, base }]],
	},
	integrations: [
		starlight({
			title: 'Open Civic',
			description: 'Open-source archive, wiki and simulator for 1990-2002 Honda Civics.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ej8civic/open-civic' }],
			customCss: ['./src/styles/custom.css'],
			head: [{ tag: 'script', attrs: { type: 'module', src: `${base}/mermaid-init.js` } }],
			lastUpdated: false,
			sidebar: [
				section('Start here', '00-start-here'),
				section('Identify your Civic', '10-identify'),
				section('Models', '20-models'),
				section('Engines', '30-engines'),
				section('Maintenance', '40-maintenance'),
				section('Longevity', '50-longevity'),
				section('Electrical', '60-electrical'),
				section('Chassis', '70-chassis'),
				section('Tuning', '80-tuning'),
				section('Known issues', '90-known-issues'),
				section('Reference', 'reference'),
			],
		}),
	],
});
