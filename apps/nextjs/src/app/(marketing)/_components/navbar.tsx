"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Menu } from "lucide-react";
// import { ModeToggle } from "./mode-toggle";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
} from "@recaply/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@recaply/ui/sheet";
import { buttonVariants } from "@recaply/ui/button";
import { useState } from "react";
import { ThemeToggle } from "@recaply/ui/theme";
import Link from "next/link";

interface RouteProps {
	href: string;
	label: string;
}

const routeList: RouteProps[] = [
	{
		href: "#features",
		label: "Features",
	},
	{
		href: "#testimonials",
		label: "Testimonials",
	},
	{
		href: "#pricing",
		label: "Pricing",
	},
	{
		href: "#faq",
		label: "FAQ",
	},
];

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
			<NavigationMenu className="mx-auto">
				<NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
					<NavigationMenuItem className="font-bold flex">
						<Link
							rel="noreferrer noopener"
							href="/"
							className="ml-2 font-bold text-xl flex"
						>
							Recaply
						</Link>
					</NavigationMenuItem>

					{/* mobile */}
					<span className="flex md:hidden">
						<ThemeToggle />

						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger className="px-2">
								<Menu
									className="flex md:hidden h-5 w-5"
									onClick={() => setIsOpen(true)}
								>
									<span className="sr-only">Menu Icon</span>
								</Menu>
							</SheetTrigger>

							<SheetContent side={"left"}>
								<SheetHeader>
									<SheetTitle className="font-bold text-xl">Recaply</SheetTitle>
								</SheetHeader>
								<nav className="flex flex-col justify-center items-center gap-2 mt-4">
									{routeList.map(({ href, label }: RouteProps) => (
										<a
											rel="noreferrer noopener"
											key={label}
											href={href}
											onClick={() => setIsOpen(false)}
											className={buttonVariants({ variant: "ghost" })}
										>
											{label}
										</a>
									))}
									<a
										rel="noreferrer noopener"
										href="https://github.com/leoMirandaa/shadcn-landing-page.git"
										target="_blank"
										className={`w-[110px] border ${buttonVariants({
											variant: "secondary",
										})}`}
									>
										<GitHubLogoIcon className="mr-2 w-5 h-5" />
										Github
									</a>
								</nav>
							</SheetContent>
						</Sheet>
					</span>

					{/* desktop */}
					<nav className="hidden md:flex gap-2">
						{routeList.map((route: RouteProps) => (
							<a
								rel="noreferrer noopener"
								href={route.href}
								key={route.label}
								className={`text-[17px] ${buttonVariants({
									variant: "ghost",
								})}`}
							>
								{route.label}
							</a>
						))}
					</nav>

					<div className="hidden md:flex gap-2">
						<a
							rel="noreferrer noopener"
							href="https://github.com/leoMirandaa/shadcn-landing-page.git"
							target="_blank"
							className={`border ${buttonVariants({ variant: "secondary" })}`}
						>
							<GitHubLogoIcon className="mr-2 w-5 h-5" />
							Github
						</a>

						<ThemeToggle />
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};
