import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsSchema } from '@astrojs/starlight/schema';

// The wiki lives in the repo's top-level docs/ folder (single source of truth).
// Folder READMEs, templates and examples are for GitHub browsing only.
export const collections = {
	docs: defineCollection({
		loader: glob({
			base: '../../docs',
			pattern: ['**/*.{md,mdx}', '!**/README.md', '!_templates/**', '!examples/**'],
		}),
		schema: docsSchema({
			extend: z.object({
				applies_to: z.array(z.string()).optional(),
				engines: z.array(z.string()).optional(),
				markets: z.array(z.enum(['BR', 'JP', 'US'])).optional(),
				difficulty: z.number().int().min(1).max(5).optional(),
				time_min: z.number().int().optional(),
				safety: z.enum(['low', 'medium', 'high']).optional(),
				tools: z.array(z.string()).optional(),
				sources: z.array(z.object({ id: z.string(), pages: z.string().optional() })).optional(),
				verified: z.boolean().optional(),
				author: z.string().optional(),
				updated: z.coerce.string().optional(),
			}),
		}),
	}),
};
