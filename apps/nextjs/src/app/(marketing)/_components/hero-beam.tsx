"use client";

import { cn } from "@recaply/ui";
import { AnimatedBeam } from "@recaply/ui/magicui/animated-beam";
import { Slack } from "lucide-react";
import React, { forwardRef, useRef } from "react";

const Circle = forwardRef<
	HTMLDivElement,
	{ className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
				className,
			)}
		>
			{children}
		</div>
	);
});

export function HeroBeam() {
	const containerRef = useRef<HTMLDivElement>(null);
	const div1Ref = useRef<HTMLDivElement>(null);
	const div2Ref = useRef<HTMLDivElement>(null);
	const div3Ref = useRef<HTMLDivElement>(null);
	const div4Ref = useRef<HTMLDivElement>(null);
	const div5Ref = useRef<HTMLDivElement>(null);
	const div6Ref = useRef<HTMLDivElement>(null);
	const div7Ref = useRef<HTMLDivElement>(null);

	return (
		<div
			className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden p-10"
			ref={containerRef}
		>
			<div className="flex h-full w-full flex-row items-stretch justify-between gap-10">
				<div className="flex flex-col justify-center gap-2">
					<Circle ref={div1Ref}>
						<Slack className="h-6 w-6" />
					</Circle>
					<Circle ref={div2Ref}>
						<Slack className="h-6 w-6" />
					</Circle>
					<Circle ref={div3Ref}>
						<Slack className="h-6 w-6" />
					</Circle>
					<Circle ref={div4Ref}>
						<Slack className="h-6 w-6" />
					</Circle>
					<Circle ref={div5Ref}>
						<Slack className="h-6 w-6" />
					</Circle>
				</div>
				<div className="flex flex-col justify-center">
					<Circle ref={div6Ref} className="h-16 w-16">
						<Slack className="h-6 w-6" />
					</Circle>
				</div>
				<div className="flex flex-col justify-center">
					<Circle ref={div7Ref}>
						<Slack className="text-black" />
					</Circle>
				</div>
			</div>

			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div1Ref}
				toRef={div6Ref}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div2Ref}
				toRef={div6Ref}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div3Ref}
				toRef={div6Ref}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div4Ref}
				toRef={div6Ref}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div5Ref}
				toRef={div6Ref}
			/>
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={div6Ref}
				toRef={div7Ref}
			/>
		</div>
	);
}
