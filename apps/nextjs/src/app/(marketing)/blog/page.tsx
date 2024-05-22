import { allPosts } from "contentlayer/generated";
import PostCard from "./_components/post-card";
import PostsList from "./_components/posts-list";

export default function Blog() {
	const posts = allPosts
		.filter((post) => post.published)
		.sort((a, b) => b.date.localeCompare(a.date))
		.slice(0, 14);

	return (
		<div className="flex justify-center py-20">
			<div className="max-w-4xl">
				<div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
					{posts.slice(0, 2).map((post) => (
						<PostCard
							key={post._id}
							post={post}
							aspect="landscape"
							preloadImage={true}
						/>
					))}
				</div>
				<PostsList initialList={posts.slice(2)} />
			</div>
		</div>
	);
}
