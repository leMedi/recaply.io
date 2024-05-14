"use client";

import { api } from "~/trpc/react";
import { Button } from "@recaply/ui/button";
import { toast } from "@recaply/ui/toast";
import { useRouter } from "next/navigation";

export function EnableContextBtn({
	contextId,
	isDisabled,
}: {
	contextId: number;
	isDisabled?: boolean;
}) {
	const router = useRouter();

	const { mutate: enable } = api.contexts.enable.useMutation({
		onSuccess() {
			toast.success("Context enabled");
			router.refresh();
		},
		onError() {
			toast.error("Failed to enable context");
		},
	});
	const { mutate: disable } = api.contexts.disable.useMutation({
		onSuccess() {
			toast.success("Context disabled");
			router.refresh();
		},
		onError() {
			toast.error("Failed to disable context");
		},
	});

	if (isDisabled) {
		return (
			<Button variant="outline" size="sm" onClick={() => enable(contextId)}>
				Enable
			</Button>
		);
	}

	return (
		<Button variant="outline" size="sm" onClick={() => disable(contextId)}>
			Disable
		</Button>
	);
}
