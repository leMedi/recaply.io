import { api } from "~/trpc/server";
import AddContextForm from "./_components/add-context-form";

export default async function AddContextPage() {
	const providers = await api.providers.all();

	return <AddContextForm providers={providers} />;
}
