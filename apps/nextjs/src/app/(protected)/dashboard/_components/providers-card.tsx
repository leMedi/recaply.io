import { auth } from "@recaply/auth";
import { Provider } from "@recaply/db/schema/providers";
import { slack } from "@recaply/providers";
import { Badge } from "@recaply/ui/badge";
import { Card } from "@recaply/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@recaply/ui/table";
import { SiSlack } from "react-icons/si";
import { api } from "~/trpc/server";
import { AddProviderBtn as AddProviderBtnComp } from "./add-provider-btn";

export async function ProvidersCard() {
	return (
		<div>
			<div className="mb-4 flex justify-between items-center">
				<h3 className="text-2xl font-semibold leading-none tracking-tight">
					Providers
				</h3>
				<AddProviderBtn />
			</div>
			<Card>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="" />
							<TableHead className="pl-8">Name</TableHead>
							<TableHead className="">Status</TableHead>
							<TableHead className="">last Recap</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<ProvidersRows />
					</TableBody>
				</Table>
			</Card>
		</div>
	);
}

async function AddProviderBtn({
	primary,
}: {
	primary?: boolean;
}) {
	const session = await auth();

	return (
		<AddProviderBtnComp
			primary={primary}
			providers={[
				{
					disabled: false,
					name: "Slack",
					link: slack.generateSlackAuth0Url(session!.user.id),
					image: "/provider-slack.webp",
				},
				{
					disabled: true,
					name: "Teams",
					link: "",
					image: "/provider-teams.png",
				},
				{
					disabled: true,
					name: "Meet",
					link: "",
					image: "/provider-meet.svg",
				},
			]}
		/>
	);
}

async function ProvidersRows() {
	const providers = await api.providers.all();

	if (!providers.length) {
		return (
			<TableRow>
				<TableCell colSpan={4} className="text-center">
					<div className="flex flex-col py-4">
						<span className="mb-4">No providers connected</span>
						<span>
							<AddProviderBtn primary />
						</span>
					</div>
				</TableCell>
			</TableRow>
		);
	}

	return (
		<>
			{(providers as Provider[]).map((provider) => (
				<TableRow key={provider.id} className="bg-accent">
					<TableCell className="flex justify-center items-center">
						<SiSlack className="w-4 h-4 mr-2" />
						<div className="hidden text-sm text-muted-foreground md:inline">
							Slack
						</div>
					</TableCell>
					<TableCell className="pl-8">
						<div className="font-medium">{provider.label}</div>
					</TableCell>
					<TableCell className="hidden sm:table-cell">
						<Badge className="text-xs" variant="outline">
							Active
						</Badge>
					</TableCell>
					<TableCell className="hidden md:table-cell">
						{provider.createdAt.toLocaleDateString()}
					</TableCell>
				</TableRow>
			))}
		</>
	);
}
