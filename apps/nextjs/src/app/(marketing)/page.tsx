import { FAQ } from "./_components/FAQ";
import { Testimonials } from "./_components/Testimonials";
import { CTA } from "./_components/cta";
import { FeaturesSection } from "./_components/features-section";
import { Hero } from "./_components/hero";

export default function HomePage() {
	return (
		<div>
			<Hero />
			<FeaturesSection />
			<Testimonials />
			<FAQ />
			<CTA />
		</div>
	);
}
