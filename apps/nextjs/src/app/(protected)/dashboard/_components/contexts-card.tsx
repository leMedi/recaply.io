import { cn } from "@recaply/ui";
import { Button, buttonVariants } from "@recaply/ui/button";
import { Card } from "@recaply/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@recaply/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@recaply/ui/tooltip";
import Link from "next/link";
import { api } from "~/trpc/server";
import { EnableContextBtn } from "./enable-context-btn";
import { NextRecapDate } from "./recap-next-date";

export async function ContextsCard() {
	const providers = await api.providers.all();

	return (
		<div>
			<div className="mb-4 flex justify-between items-center">
				<h3 className="text-2xl font-semibold leading-none tracking-tight">
					Contexts
				</h3>
				{providers.length === 0 ? (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Button disabled variant={"outline"}>
									Create Context
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Connect providers to collect infomation</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : (
					<Link
						className={cn(buttonVariants({ variant: "outline" }), "mt-2")}
						href="/dashboard/add-context"
					>
						Create Context
					</Link>
				)}
			</div>
			<Card>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-8">Name</TableHead>
							<TableHead className="">last Recap</TableHead>
							<TableHead className="">Next Recap at</TableHead>
							<TableHead className="" />
						</TableRow>
					</TableHeader>
					<TableContent />
				</Table>
			</Card>
		</div>
	);
}

async function TableContent() {
	const context = await api.contexts.all();

	return (
		<TableBody>
			{context.map((context) => (
				<TableRow key={context.id} className="bg-accent">
					<TableCell className="pl-8">
						<div className="font-medium">{context.name}</div>
						<div className="hidden text-sm text-muted-foreground md:inline">
							at {context.recapTime} for the past {context.recapTimeSpan} hours
						</div>
					</TableCell>
					<TableCell className="hidden md:table-cell">--</TableCell>
					<TableCell className="hidden md:table-cell">
						<NextRecapDate recapTime={context.recapTime} />
					</TableCell>
					<TableCell className="flex justify-end pr-4">
						<EnableContextBtn
							contextId={context.id}
							isDisabled={!!context.disabledAt}
						/>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}
