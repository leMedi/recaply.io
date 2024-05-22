"use server";

import { allPosts } from "contentlayer/generated";

export const loadMorePosts = async (offset: number) => {
	const posts = allPosts
		.filter((post) => post.published)
		.sort((a, b) => b.date.localeCompare(a.date))
		.slice(offset, offset + 12);

	return posts ?? [];
};
