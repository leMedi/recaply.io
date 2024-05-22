"use client";

import { allPosts, Post } from "contentlayer/generated";
import PostCard from "./post-card";
import { useState } from "react";
import { Button } from "@recaply/ui/button";
import { loadMorePosts } from "../load-more.action";
import { cn } from "@recaply/ui";

export default function PostsList({
	initialList,
}: {
	initialList: Post[];
}) {
	const [posts, setPosts] = useState(initialList);

	const loadMoreUsers = async (offset: number) => {
		console.log("loadMoreUsers", offset);
		const newPosts = await loadMorePosts(offset);
		setPosts([...posts, ...newPosts]);
	};

	return (
		<div>
			<div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} aspect="square" />
				))}
			</div>
			<div className="flex justify-center w-full mt-14">
				<Button
					variant="secondary"
					className={cn({
						hidden: posts.length >= allPosts.length - 2,
					})}
					onClick={() => {
						loadMoreUsers(posts.length + 2);
					}}
				>
					Load More
				</Button>
			</div>
		</div>
	);
}
