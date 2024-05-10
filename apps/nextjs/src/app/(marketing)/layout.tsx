import { Navbar } from "./_components/navbar";

export default function MarketingLayout(props: { children: React.ReactNode }) {
	return (
		<div>
			<Navbar />
			{props.children}
		</div>
	);
}
