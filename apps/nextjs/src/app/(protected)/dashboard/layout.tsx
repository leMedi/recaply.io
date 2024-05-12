import { auth } from "@recaply/auth";
import { DashboardNavbar } from "./_components/navbar";

export default async function DashboardLayout(props: {
	children: React.ReactNode;
}) {
	const session = await auth();

	return (
		<div>
			<DashboardNavbar user={session?.user!} />
			<main className="max-w-6xl h-14 px-4 w-screen m-auto py-8">
				{props.children}
			</main>
		</div>
	);
}
