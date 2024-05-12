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
					image:
						"https://previews.us-east-1.widencdn.net/preview/48045879/assets/asset-view/4fe2aea7-92aa-4833-94af-97b882d8cb2f/thumbnail/eyJ3Ijo0ODAsImgiOjQ4MCwic2NvcGUiOiJhcHAifQ==?Expires=1715472000&Signature=kR-tzf~etkZKLvJISRL-hojd9yzORu~-1Mt~vFOd~k5zMRK2jqa-rGHPR4fqi8Lf~YQv0hO5t9A6FqMbg6nnC3saqNwajXWawYpMLusnLCgJRpi~sy-ho1HH2VJlI~5Qq13JL~fL-zjP4fALs6YUmZmEAmL9JWODkEFXgsV-Xp9f3ndUkXMezRu~GRyriTqJpS0K2aJUxk~8oTntWuwoxlK3YpwLeLUOWS8pvnFXjFRphmCcRJ41qJikprMlclk5yrbgvOMalgaGvI6dc~3AAx7BOqJNwKpr1lKIKJndcyN6Jbauhhipom~XBd8TfxAHnE1A7ptda~b9rIW9-gts7w__&Key-Pair-Id=APKAJM7FVRD2EPOYUXBQ",
				},
				{
					disabled: true,
					name: "Teams",
					link: "",
					image:
						"https://logodownload.org/wp-content/uploads/2021/08/microsoft-teams-logo-1.png",
				},
				{
					disabled: true,
					name: "Meet",
					link: "",
					image:
						"https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg",
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
