import { cn } from "@recaply/ui";
import { buttonVariants } from "@recaply/ui/button";
import Link from "next/link";
import { HeroBeam } from "./hero-beam";

export function Hero() {
	return (
		<section className="pt-32 sm:pt-40 md:pt-48">
			<div className="mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0">
				<div className="relative">
					<h1 className="text-center text-5xl font-bold text-blue-900 dark:text-white sm:text-6xl lg:text-left lg:text-7xl">
						Design, Build,
						<span className="relative">
							<span className="relative bg-gradient-to-r from-primary to-[#957fef] bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight md:px-2">
								Scale
							</span>
						</span>
					</h1>

					<div className="relative items-center gap-12 lg:flex">
						<div className="text-center sm:mx-auto sm:w-11/12 md:mt-12 md:w-4/5 lg:mt-0 lg:mr-auto lg:w-6/12 lg:text-left">
							<p className="mt-12 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
								Computers used to be magical. But much of that magic has been
								lost over time, replaced by subpar tools and practices that slow
								teams down and hold great work back.
							</p>

							<Link
								className={cn(
									"mt-12",
									buttonVariants({ variant: "primary" }),
									"h-12 w-16 sm:w-auto sm:px-6 rounded-full",
								)}
								href="/signup"
							>
								Get Your Recape
							</Link>
						</div>
						<div className="mt-12 w-full overflow-hidden sm:mt-20 lg:-mt-8 lg:w-6/12">
							<HeroBeam />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
