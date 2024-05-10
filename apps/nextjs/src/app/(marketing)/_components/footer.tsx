export const Footer = () => {
	return (
		<footer id="footer">
			<hr className="w-11/12 mx-auto" />

			<section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
				<div className="col-span-full xl:col-span-2">
					<a
						rel="noreferrer noopener"
						href="/"
						className="font-bold text-xl flex"
					>
						{/* <LogoIcon /> */}
						Recapily
					</a>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">Follow US</h3>
					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Github
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Twitter
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Dribbble
						</a>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">About</h3>
					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Features
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
							className="opacity-60 hover:opacity-100"
						>
							Pricing
						</a>
					</div>

					<div>
						<a
							rel="noreferrer noopener"
							href="#"
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
