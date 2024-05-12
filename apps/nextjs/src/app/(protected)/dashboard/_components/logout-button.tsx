"use client";

import { Button } from "@recaply/ui/button";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

export const LogoutButton = () => {
	return (
		<Button
			variant="secondary"
			onClick={() => {
				signOut({ callbackUrl: "/" });
			}}
		>
			<MdLogout />
		</Button>
	);
};
