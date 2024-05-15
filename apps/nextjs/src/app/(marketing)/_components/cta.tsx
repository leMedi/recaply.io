import { cn } from "@recaply/ui";
import { Button, buttonVariants } from "@recaply/ui/button";
import Link from "next/link";

export function CTA() {
	return (
		<section className="relative before:absolute before:inset-0 before:h-px before:w-96 before:bg-gradient-to-r before:from-yellow-300 before:via-pink-400 before:to-transparent after:absolute after:inset-0 after:ml-auto after:mt-auto after:h-px after:w-96 after:bg-gradient-to-l after:from-yellow-300 after:via-pink-400 after:to-transparent">
			<div className="border-y border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
				<div className="relative mx-auto px-6 container md:px-8">
					<div className="items-center justify-between md:flex">
						<div className="h-max py-16">
							<div className="text-center md:text-left">
								<h2 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl xl:text-4xl">
									Ready to Transform Your Day? <br />
								</h2>
								<p className="text-xl mb-2 mt-2 text-gray-600 dark:text-gray-300">
									Experience the power of concise, focused updates. Say goodbye
									to notification overload and hello to a more productive you.
								</p>

								<Link
									href={"/signup"}
									className={cn(
										buttonVariants({
											variant: "primary",
											size: "lg",
										}),
										"font-normal text-[white] h-auto py-3 mt-8 text-2xl",
									)}
								>
									Get Your Recape
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
