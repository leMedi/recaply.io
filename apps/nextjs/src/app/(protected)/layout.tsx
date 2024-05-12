import { auth } from "@recaply/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout(props: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session) {
		return redirect("/signin");
	}

	return <div>{props.children}</div>;
}
