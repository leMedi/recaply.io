import { auth } from "@recaply/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout(props: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (session) {
		return redirect("/dashboard");
	}

	return props.children;
}
