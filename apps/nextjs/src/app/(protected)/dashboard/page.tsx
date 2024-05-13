import { ContextsCard } from "./_components/contexts-card";
import { ProvidersCard } from "./_components/providers-card";

export default async function Dashboard() {
	return (
		<div className="space-y-10">
			<ContextsCard />
			<ProvidersCard />
		</div>
	);
}
