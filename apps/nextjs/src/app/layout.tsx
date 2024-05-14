import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";

import { cn } from "@recaply/ui";
import { ThemeProvider } from "@recaply/ui/theme";
import { Toaster } from "@recaply/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";

export const metadata: Metadata = {
	metadataBase: new URL(
		env.VERCEL_ENV === "production"
			? env.NEXT_PUBLIC_URL
			: "http://localhost:3000",
	),
	title: "Recaply",
	description: "Daily audio recaps of your Slack messages",
	openGraph: {
		title: "Recaply",
		description: "Daily audio recaps of your Slack messages",
		url: env.NEXT_PUBLIC_URL,
		siteName: "Recaply",
	},
	twitter: {
		card: "summary_large_image",
		site: "@Mehdi_ElHAIJ",
		creator: "@Mehdi_ElHAIJ",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans text-foreground antialiased",
					GeistSans.variable,
					GeistMono.variable,
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<TRPCReactProvider>{props.children}</TRPCReactProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
