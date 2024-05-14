"use client";

import { calcNextRecapDate } from "@recaply/utils";

export function NextRecapDate({
	recapTime,
}: {
	recapTime: string;
}) {
	const nextRecapDate = calcNextRecapDate(recapTime);

	return (
		<>
			{nextRecapDate.toLocaleDateString()} at{" "}
			{nextRecapDate.toLocaleTimeString(navigator.language, {
				hour: "numeric",
				// timeStyle: "full",
				// minute: null,
			})}
		</>
	);
}
