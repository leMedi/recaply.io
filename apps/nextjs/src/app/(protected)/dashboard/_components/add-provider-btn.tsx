"use client";

import { cn } from "@recaply/ui";
import { Button } from "@recaply/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@recaply/ui/dialog";
import Link from "next/link";

export function AddProviderBtn({
	primary,
	providers,
}: {
	primary?: boolean;
	providers: {
		name: string;
		image: string;
		link: string;
		disabled: boolean;
	}[];
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={primary ? "primary" : "outline"}>
					Connect Provider
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Connect Provider</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="flex justify-center gap-6 py-8">
					{providers.map((provider) => (
						<ProviderBtn
							disabled={provider.disabled}
							key={provider.name}
							title={provider.name}
							link={provider.link}
							img={provider.image}
						/>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}

const ProviderBtn = ({
	disabled,
	img,
	title,
	link,
}: {
	img: string;
	title: string;
	link: string;
	disabled?: boolean;
}) => {
	return (
		<Link
			onClick={(e) => {
				if (disabled) {
					return e.preventDefault();
				}
			}}
			href={link}
			className={cn(
				"border rounded-xl flex flex-col justify-center items-center w-32 h-32 text-lg text-center p-4 shadow",
				{ "bg-gray-200 opacity-50 cursor-not-allowed": disabled },
			)}
		>
			<img src={img} alt={title} className={cn("w-10 h-10 mt-2 mb-3")} />
			{title}
			{disabled && <span className="text-xs">(Comming soon)</span>}
		</Link>
	);
};
