import { allPosts } from "contentlayer/generated";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = allPosts
		.filter((post) => post.published)
		.sort((a, b) => b.date.localeCompare(a.date))
		.map((post) => ({
			url: `https://recaply.io${post.url}`,
			lastModified: new Date(post.date),
			changeFrequency: "weekly" as const,
			priority: 0.5,
		}));

	return [
		{
			url: "https://recaply.io/",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://recaply.io/dashboard",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://recaply.io/blog",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},

		...posts,
	];
}
