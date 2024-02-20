import { z, reference, defineCollection } from "astro:content";

const blog = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date(),
		author: reference("author"),
		image: z.string().optional(),
		draft: z.boolean().default(true),
	}),
});

const author = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
		image: z.string().optional(),
		socials: z.object({
			twitter: z.string().url().optional(),
			github: z.string().url().optional(),
			linkedin: z.string().url().optional(),
		}),
	}),
});

export const collections = { blog, author };
