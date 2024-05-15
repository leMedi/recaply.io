import { Avatar, AvatarFallback, AvatarImage } from "@recaply/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@recaply/ui/card";

interface TestimonialProps {
	image: string;
	name: string;
	userName: string;
	comment: string;
}

const testimonials: TestimonialProps[] = [
	{
		image: "/testimonials/1.jpg",
		name: "Sarah T.",
		userName: "@john_Doe",
		comment:
			"The daily audio summaries are a game-changer for staying informed without the overwhelm.",
	},
	{
		image: "/testimonials/3.jpg",
		name: "Mike J.",
		userName: "@john_Doe1",
		comment:
			"Recaply keeps me focused and productive by delivering only the most crucial updates. It's like having a personal assistant that filters out the noise and delivers the essentials, helping me stay on top of my tasks effortlessly.",
	},

	{
		image: "/testimonials/6.jpg",
		name: "Emily R.",
		userName: "@john_Doe2",
		comment:
			"Recaply has transformed how I start my day. No more sifting through endless notifications! Now, I get a clear, concise audio summary of the most important updates, allowing me to focus on my priorities right from the get-go. It's a true productivity booster!",
	},
	{
		image: "/testimonials/4.jpg",
		name: "John L.",
		userName: "@john_Doe3",
		comment:
			"Integration was a breeze, and now I feel more on top of my tasks than ever.",
	},
	{
		image: "/testimonials/5.jpg",
		name: "Jessica K.",
		userName: "@john_Doe4",
		comment:
			"I love how Recaply consolidates everything into a quick, digestible audio summary.",
	},
	{
		image: "/testimonials/2.jpg",
		name: "David M.",
		userName: "@john_Doe5",
		comment:
			"Thanks to Recaply, I can keep up with important events even on my busiest days.",
	},
];

export const Testimonials = () => {
	return (
		<section id="testimonials" className="container py-24 sm:py-32">
			<h2 className="text-3xl md:text-4xl font-bold">
				Discover Why
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					{" "}
					People Love{" "}
				</span>
				Recaply
			</h2>

			<p className="text-xl text-muted-foreground pt-4 pb-8">
				Hear how Recaply is transforming productivity and focus for
				professionals like you
			</p>

			<div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
				{testimonials.map(
					({ image, name, userName, comment }: TestimonialProps) => (
						<Card
							key={userName}
							className="max-w-md md:break-inside-avoid overflow-hidden"
						>
							<CardHeader className="flex flex-row items-center gap-4 pb-2">
								<Avatar>
									<AvatarImage alt="" src={image} />
									<AvatarFallback>OM</AvatarFallback>
								</Avatar>

								<div className="flex flex-col">
									<CardTitle className="text-lg">{name}</CardTitle>
									{/* <CardDescription>{userName}</CardDescription> */}
								</div>
							</CardHeader>

							<CardContent>{comment}</CardContent>
						</Card>
					),
				)}
			</div>
		</section>
	);
};
