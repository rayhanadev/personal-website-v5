import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const blog = await getCollection("blog");
	return rss({
		title: "RayhanADev's Blog",
		description:
			"A series of blog posts by Ray related to software development, cybersecurity, and growing up in the modern age.",
		site: "https://www.rayhanadev.com",
		items: blog.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			link: `/blog/${post.slug}/`,
			pubDate: post.data.date,
			language: "en-us",
			copyright: "Copyright © 2023, Rayhan Noufal Arayilakath",
			author: "me@rayhanadev.com",
			managingEditor: "me@rayhanadev.com",
			webMaster: "me@rayhanadev.com",
			docs: "https://cyber.harvard.edu/rss/rss.html",
			ttl: 60,
			lastBuildDate: new Date(),
			stylesheet: "/rss/styles.xsl",
		})),
	});
};
