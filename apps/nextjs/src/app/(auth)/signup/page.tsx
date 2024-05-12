import { signIn } from "@recaply/auth";
import { cn } from "@recaply/ui";
import { Button, buttonVariants } from "@recaply/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Authentication",
	description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
	return (
		<div className="relative h-screen flex-col items-center justify-center lg:max-w-none lg:px-0">
			<Link
				href="/"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute left-4 top-4 md:left-8 md:top-8",
				)}
			>
				Recapify
			</Link>
			<div className="p-4 lg:p-8 h-full flex items-center">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Create an account
						</h1>
						{/* <p className="text-sm text-muted-foreground">
							Enter your email below to create your account
						</p> */}
					</div>
					<form>
						<div className="flex flex-col space-y-2 text-center">
							<Button
								variant="outline"
								formAction={async () => {
									"use server";
									await signIn("google");
								}}
							>
								Sign up with Google
							</Button>
						</div>
					</form>
					<p className="px-8 text-center text-sm text-muted-foreground">
						By clicking continue, you agree to our{" "}
						<Link
							href="/terms"
							className="underline underline-offset-4 hover:text-primary"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href="/privacy"
							className="underline underline-offset-4 hover:text-primary"
						>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
