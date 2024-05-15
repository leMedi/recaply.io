"use client";

import { cn } from "@recaply/ui";
import { buttonVariants } from "@recaply/ui/button";
import { RetroGrid } from "@recaply/ui/magicui/retro-grid";
import { BorderBeam } from "@recaply/ui/magicui/border-beam";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function Hero() {
	const [windowWidth, setWindowWidth] = useState(0);
	const [hasMounted, setHasMounted] = useState(false);

	const { theme } = useTheme();

	useEffect(() => {
		setWindowWidth(window.innerWidth);

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);

		// Set hasMounted to true after component mounts
		setHasMounted(true);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<section className="pt-26 sm:pt-20 md:pt-40">
			<div>
				<RetroGrid className="" />
				<motion.div
					initial={{
						opacity: 0,
						translateY: 10,
					}}
					animate={{
						opacity: 1,
						translateY: 0,
					}}
					transition={{
						duration: 0.5,
						delay: 0.1,
						ease: "easeInOut",
					}}
				>
					<div className="text-center text-xl font-bold text-blue-900 dark:text-white sm:text-6xl lg:text-4xl">
						<h2 className="text-center text-xl lg:text-4xl">
							Unplug, Listen, Inform
						</h2>
						<h1 className="lg:text-7xl  bg-gradient-to-r from-primary to-[#957fef] bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight">
							Your Day in a Minute
						</h1>
					</div>
					<span className="block mt-4 text-xl text-center text-gray-600 dark:text-gray-300">
						Your daily audio summary from Slack, Teams, and more. Stay updated
						effortlessly!
					</span>

					<div className="flex justify-center mt-14">
						<Link
							href="/signup"
							className={cn(
								buttonVariants({ variant: "primary", size: "lg" }),
								"text-xl font-normal px-10 py-6 rounded-full bg-blue-600 dark:text-white",
							)}
						>
							Get Your Recap
						</Link>
					</div>
				</motion.div>
			</div>

			<div className="flex justify-center">
				<motion.div
					initial={{
						opacity: 0,
						translate: "0 4rem",
						transform: "perspective(500px) rotateX(30deg)",
					}}
					animate={{
						opacity: 1,
						translate: 0,
						transform: "perspective(500px) rotateX(1deg)",
					}}
					transition={{
						duration: 1,
						delay: 0.5,
						ease: "easeInOut",
						easings: "cubic-bezier(.8,0,.2,1)",
					}}
					className="relative overflow-hidden rounded-xl md:rounded-2xl max-w-7xl mt-10 md:mt-16 mx-auto z-10 border"
				>
					<motion.div
						initial={{
							opacity: 0,
							translateX: "-40%",
							translateY: "90%",
							rotate: "125deg",
						}}
						animate={{
							opacity: 1,
							translateX: "-30%",
							translateY: "100%",
							rotate: "135deg",
						}}
						transition={{
							duration: 0.5,
							delay: 1,
							ease: "easeInOut",
							damping: 30,
							stiffness: 500,
						}}
						className="hidden md:block absolute inset-0 rounded-xl md:rounded-2xl bg-[linear-gradient(transparent,#ffffff08);] w-[150%] h-[20rem] "
					/>
					<motion.img
						className="dashboard-image w-full h-full max-w-[900px] object-cover rounded-xl md:rounded-2xl hidden dark:block"
						src="/dashboard-showcase-dark.png"
						alt="Dashboard Mockup"
					/>
					<motion.img
						className="dashboard-image w-full h-full max-w-[900px] object-cover rounded-xl md:rounded-2xl dark:hidden block"
						src="/dashboard-showcase.png"
						alt="Dashboard Mockup"
					/>
					{hasMounted && (
						<BorderBeam
							size={windowWidth < 768 ? 120 : 250}
							duration={12}
							delay={9}
							colorFrom={theme === "dark" ? "#ffffff" : "#957fef"}
							colorTo={theme === "dark" ? "#ffffff80" : "#2563eb"}
						/>
					)}
				</motion.div>
			</div>
		</section>
	);
}
