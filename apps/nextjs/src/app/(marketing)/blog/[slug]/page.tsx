import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { parseISO, format } from "date-fns";

import { allPosts } from "contentlayer/generated";
import { Mdx } from "../_components/mdx-content";

export const generateMetadata = ({
	params: { slug },
}: { params: { slug: string } }) => {
	const post = allPosts.find((post) => post.url.includes(slug));
	if (!post) throw new Error(`Post not found for slug: ${slug}`);
	return { title: post.title };
};

export default function BlogPost({
	params: { slug },
}: { params: { slug: string } }) {
	const post = allPosts.find((post) => post.url.includes(slug)) || notFound();

	return (
		<div className="py-20 px-10 md:px-0">
			<div className="flex justify-center pb-10">
				<div className="mx-auto max-w-screen-md ">
					<h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
						{post.title}
					</h1>

					<div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
						<div className="flex items-center gap-3">
							<div className="flex items-center space-x-2 text-sm">
								<time
									className="text-gray-500 dark:text-gray-400"
									dateTime={post?.date}
								>
									{format(parseISO(post?.date), "MMMM dd, yyyy")}
								</time>
								<span>{post.readingTime}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg mb-20">
				<Image
					src={post.image}
					alt={post.title}
					loading="eager"
					fill
					sizes="100vw"
					className="object-cover"
				/>
			</div>

			<div>
				<article className="mx-auto max-w-screen-md ">
					<div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
						<Mdx code={post.body.code} />
					</div>
					<div className="mb-7 mt-7 flex justify-center">
						<Link
							href="/blog"
							className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 "
						>
							← View all posts
						</Link>
					</div>
				</article>
			</div>
		</div>
	);
}
