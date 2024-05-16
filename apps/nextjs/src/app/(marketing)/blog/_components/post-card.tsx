import { cn } from "@recaply/ui";
import { Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function PostCard({
	post,
	aspect,
	preloadImage,
}: {
	post: Post;
	aspect?: "landscape" | "square" | "custom";
	preloadImage?: boolean;
}) {
	return (
		<>
			<div className={cn("group cursor-pointer")}>
				<div
					className={cn(
						" overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105   dark:bg-gray-800",
					)}
				>
					<Link
						className={cn(
							"relative block",
							aspect === "landscape"
								? "aspect-video"
								: aspect === "custom"
									? "aspect-[5/4]"
									: "aspect-square",
						)}
						href={post.url}
					>
						<Image
							src={post.image}
							alt={"Thumbnail"}
							priority={preloadImage}
							className="object-cover transition-all"
							fill
							sizes="(max-width: 768px) 30vw, 33vw"
						/>
					</Link>
				</div>

				<div>
					<div>
						{/* <CategoryLabel categories={post.categories} nomargin={minimal} /> */}
						<h2
							className={cn(
								"text-lg",
								"font-semibold leading-snug tracking-tight",
								"mt-2 dark:text-white",
							)}
						>
							<Link href={post.url}>
								<span
									className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
      bg-no-repeat
      transition-[background-size]
      duration-500
      hover:bg-[length:100%_3px]
      group-hover:bg-[length:100%_10px]
      dark:from-purple-800 dark:to-purple-900"
								>
									{post.title}
								</span>
							</Link>
						</h2>

						<div className="hidden">
							{post.description && (
								<p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
									<Link href={post.url}>{post.description}</Link>
								</p>
							)}
						</div>

						<div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
							<span className="text-xs text-gray-300 dark:text-gray-600">
								&bull;
							</span>
							<time className="truncate text-sm" dateTime={post?.date}>
								{format(parseISO(post?.date), "MMMM dd, yyyy")}
							</time>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
