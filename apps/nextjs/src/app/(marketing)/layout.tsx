import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

export default function MarketingLayout(props: { children: React.ReactNode }) {
	return (
		<div>
			<Navbar />
			{props.children}
			<Footer />
		</div>
	);
}
