import { AnimatedNotifications } from "./animated-notifications";

export function FeaturesSection() {
	return (
		<section className="mt-32">
			<div className="mx-auto px-4 sm:px-12 xl:max-w-7xl xl:px-0">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl xl:text-5xl">
						Orie, l'IA qui éclaircit tous vos doutes comptables, instantanément!
					</h2>
					<p className="mx-auto mt-6 text-gray-700 dark:text-gray-300 md:w-3/4 lg:w-3/5">
						Orie, votre expert comptable toujours à votre écoute, maîtrise les
						subtilités comptables marocaines. Accessible 24/7, elle est là pour
						répondre instantanément à toutes vos questions.
					</p>
				</div>
				<div className="mt-20">
					<div className="gap-6 space-y-12 md:flex md:space-y-0">
						<div className="relative md:w-1/2">
							<div
								className="panel inset-0 flex flex-col justify-center transition duration-500 md:absolute visible opacity-100 scale-100"
								id="panel-0"
							>
								<div>
									<h3 className="text-2xl font-bold text-gray-900 dark:text-white md:text-2xl">
										Voici quelques exemples de questions que vous pourriez poser
										à Orie
									</h3>
									<p className="mt-8 text-gray-600 dark:text-gray-300">
										Orie, votre expert comptable toujours à votre écoute,
										maîtrise les subtilités comptables marocaines. Accessible
									</p>
									<div className="mt-12 space-y-6">
										<div className="flex items-center gap-6">
											<div className="flex h-20 w-20 rounded-3xl border border-gray-200 bg-white p-4 dark:border-gray-600/60 dark:bg-gray-900/40">
												<img
													className="m-auto h-8 w-auto"
													src="https://cdn-icons-png.flaticon.com/512/4727/4727266.png"
													alt="icon illustration"
													loading="lazy"
													width="512"
													height="512"
												/>
											</div>
											<div className="w-[calc(100%-7.5rem)]">
												<h4 className="text-md font-semibold text-gray-800 dark:text-white">
													Together as one
												</h4>
												<p className="mt-1 text-gray-600 dark:text-gray-400">
													Accusantium nemo perspiciatis delectus atque autem!
												</p>
											</div>
										</div>

										<div className="flex items-center gap-6">
											<div className="flex h-20 w-20 rounded-3xl border border-gray-200 bg-white p-4 dark:border-gray-600/60 dark:bg-gray-900/40">
												<img
													className="m-auto h-8 w-auto"
													src="https://cdn-icons-png.flaticon.com/512/4727/4727266.png"
													alt="icon illustration"
													loading="lazy"
													width="512"
													height="512"
												/>
											</div>
											<div className="w-[calc(100%-7.5rem)]">
												<h4 className="text-md font-semibold text-gray-800 dark:text-white">
													Growth
												</h4>
												<p className="mt-1 text-gray-600 dark:text-gray-400">
													Accusalectus atque autem accusantium nemo perspiciatis
													delectus atque autem!
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="-m-4 overflow-hidden p-4 sm:-mx-12 sm:px-12 md:mx-0 md:w-1/2 md:overflow-visible md:px-0">
							<div className="relative bg-gray-100 before:absolute before:inset-0 before:scale-x-110 before:border-y before:border-gray-200 after:absolute after:inset-0 after:scale-y-110 after:border-x after:border-gray-200 dark:bg-gray-800 dark:before:border-gray-700 dark:after:border-gray-700">
								<div className="relative h-96 overflow-clip py-10 sm:h-[32rem] lg:p-20">
									<div
										data-target="panel-0"
										className="block panel-preview absolute inset-0 z-10 translate-y-0 scale-100 items-end overflow-hidden px-6 opacity-100 transition duration-500 sm:px-10 pt-16"
									>
										<AnimatedNotifications />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
