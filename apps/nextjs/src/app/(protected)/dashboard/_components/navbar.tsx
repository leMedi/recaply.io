"use client";

import { Session } from "@recaply/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@recaply/ui/avatar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@recaply/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@recaply/ui/sheet";
import { ThemeToggle } from "@recaply/ui/theme";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@recaply/ui/tooltip";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getInitials } from "~/utils/strings";
import { LogoutButton } from "./logout-button";

export const DashboardNavbar = ({ user }: { user: Session["user"] }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
			<NavigationMenu className="mx-auto">
				<NavigationMenuList className="max-w-6xl h-14 px-4 w-screen flex justify-between">
					<NavigationMenuItem className="flex items-end">
						<Link
							rel="noreferrer noopener"
							href="/dashboard"
							className="font-bold text-2xl flex"
						>
							Recaply
						</Link>
						<div className="hidden pb-1 pl-2 md:flex text-sm h-full justify-end text-gray-400 dark:text-gray-600">
							By{" "}
							<Link href="https://lemedi.dev" className="ml-1 underline">
								LeMedi
							</Link>
						</div>
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
									<UserAvatar user={user} />
									<LogoutButton />
								</nav>
							</SheetContent>
						</Sheet>
					</span>

					<div className="hidden md:flex gap-2">
						<UserAvatar user={user} />
						<LogoutButton />
						<ThemeToggle />
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};

const UserAvatar = ({ user }: { user: Session["user"] }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Avatar>
						<AvatarImage src={user.image ?? undefined} alt="@shadcn" />
						<AvatarFallback>{getInitials(user.name ?? "")}</AvatarFallback>
					</Avatar>
				</TooltipTrigger>
				<TooltipContent>
					<p>{user.email}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
