import { FAQ } from "./_components/FAQ";
import { Testimonials } from "./_components/Testimonials";
import { ContactUs } from "./_components/contact-us";
import { FeaturesSection } from "./_components/features-section";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";

export default function HomePage() {
	return (
		<div>
			<Hero />
			<FeaturesSection />
			<Testimonials />
			<FAQ />
			<ContactUs />
			<Footer />
		</div>
	);
}
