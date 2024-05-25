import Link from "next/link";

export const Footer = () => {
	return (
		<footer id="footer">
			<hr />

			<section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
				<div className="col-span-full xl:col-span-2">
					<a
						rel="noreferrer noopener"
						href="/"
						className="font-bold text-4xl flex"
					>
						Recaply
					</a>
					<span className="text-gray-600 dark:text-gray-300 mt">
						by{" "}
						<a href="https://lemedi.dev" className="underline">
							LeMedi
						</a>
					</span>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">Follow US</h3>
					<div>
						<a
							href="https://github.com/leMedi"
							className="opacity-60 hover:opacity-100"
						>
							Github
						</a>
					</div>

					<div>
						<a
							href="https://twitter.com/Mehdi_ElHAIJ"
							className="opacity-60 hover:opacity-100"
						>
							Twitter
						</a>
					</div>

					<div>
						<a
							href="https://lemedi.dev"
							className="opacity-60 hover:opacity-100"
						>
							Portfolio
						</a>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">About</h3>
					<div>
						<Link href="/blog" className="opacity-60 hover:opacity-100">
							Blog
						</Link>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#features"
							className="opacity-60 hover:opacity-100"
						>
							Features
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#testimonials"
							className="opacity-60 hover:opacity-100"
						>
							Testimonials
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#faq"
							className="opacity-60 hover:opacity-100"
						>
							FAQ
						</a>
					</div>
				</div>
			</section>
		</footer>
	);
};
