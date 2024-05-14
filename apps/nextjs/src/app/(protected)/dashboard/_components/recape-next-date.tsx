"use client";

import { calcNextRecapDate } from "@recaply/utils";

export function NextRecapDate({
	recapeTime,
}: {
	recapeTime: string;
}) {
	const nextRecapeDate = calcNextRecapDate(recapeTime);

	return (
		<>
			{nextRecapeDate.toLocaleDateString()} at{" "}
			{nextRecapeDate.toLocaleTimeString(navigator.language, {
				hour: "numeric",
				// timeStyle: "full",
				// minute: null,
			})}
		</>
	);
}
