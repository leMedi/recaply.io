import { AnimatedNotifications } from "./animated-notifications";
import { HeroBeam } from "./hero-beam";

export function FeaturesSection() {
	return (
		<section id="features" className="mt-32">
			<div className="mx-auto px-4 sm:px-12 xl:max-w-7xl xl:px-0">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-blue-600 dark:text-white md:text-4xl xl:text-5xl">
						Cut Through the Clutter <br /> Beat Notification Overload with
						Recaply
					</h2>
					<p className="mx-auto mt-6 text-gray-700 dark:text-gray-300 md:w-3/4 lg:w-3/5">
						Never miss out on important updates from Slack, Microsoft Teams, and
						more. Get a concise audio summary of top events every morning
					</p>
				</div>

				<div className="mt-20">
					<div className="gap-6 space-y-12 md:flex md:space-y-0">
						<div className="relative md:w-1/2">
							<div className="pt-12 lg:pr-20 flex flex-col justify-center transition duration-500 md:absolute visible opacity-100 scale-100">
								<div>
									<h3 className="text-2xl font-bold text-gray-900 dark:text-white md:text-2xl">
										Overcome Notification Overload
									</h3>
									<p className="mt-8 text-gray-600 dark:text-gray-300">
										Effortlessly connect Recaply with your essential
										communication tools like Slack, Microsoft Teams, and more.
										Never miss an important update regardless of where it was
										posted.
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
													Streamlined Information
												</h4>
												<p className="mt-1 text-gray-600 dark:text-gray-400">
													Say goodbye to constant pings and alerts. Recaply
													extracts only the most crucial updates from your
													notification-heavy platforms.
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
													Enhanced Concentration
												</h4>
												<p className="mt-1 text-gray-600 dark:text-gray-400">
													Eliminate the mental fatigue caused by an avalanche of
													notifications.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="overflow-hidden sm:-mx-12 sm:px-12 md:mx-0 md:w-1/2 md:overflow-visible md:px-0">
							<div className="relative bg-gray-100 before:absolute before:inset-0 before:scale-x-110 before:border-y before:border-gray-200 after:absolute after:inset-0 after:scale-y-110 after:border-x after:border-gray-200 dark:bg-gray-800 dark:before:border-gray-700 dark:after:border-gray-700">
								<div className="flex justify-center px-4 h-96 overflow-clip py-10 sm:h-[32rem] pt-28">
									<AnimatedNotifications />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-28">
					<div className="gap-6 space-y-12 md:flex md:space-y-0">
						<div className="overflow-hidden sm:-mx-12 sm:px-12 md:mx-0 md:w-1/2 md:overflow-visible md:px-0">
							<div className="relative bg-gray-100 before:absolute before:inset-0 before:scale-x-110 before:border-y before:border-gray-200 after:absolute after:inset-0 after:scale-y-110 after:border-x after:border-gray-200 dark:bg-gray-800 dark:before:border-gray-700 dark:after:border-gray-700">
								<div className="flex justify-center h-96 overflow-clip py-10 sm:h-[32rem]">
									<HeroBeam />
								</div>
							</div>
						</div>
						<div className="relative md:w-1/2">
							<div className="pt-12 lg:pl-20 flex flex-col justify-center transition duration-500 md:absolute visible opacity-100 scale-100">
								<div>
									<h3 className="text-2xl font-bold text-gray-900 dark:text-white md:text-2xl">
										Automated Summaries
									</h3>
									<p className="mt-8 text-gray-600 dark:text-gray-300">
										Centralize all your important updates in one place. Recaply
										consolidates notifications from multiple platforms, ensuring
										you never miss a critical update again.
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
													Customizable Preferences
												</h4>
												<p className="mt-1 text-gray-600 dark:text-gray-400">
													Tailor your audio summaries to fit your needs. Select
													specific channels, keywords, or project updates to
													receive personalized and relevant information.
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
													Seamless Integration
												</h4>
												<p className="mt-1 text-gray-600 dark:text-gray-400">
													Integrate Recaply with just a few clicks. Connect your
													Slack, Microsoft Teams, and other favorite
													communication platforms easily, and get started in
													minutes.
												</p>
											</div>
										</div>
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
