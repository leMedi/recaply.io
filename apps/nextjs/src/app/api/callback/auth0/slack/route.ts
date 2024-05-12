import { db, eq, schema } from "@recaply/db";
import { slack } from "@recaply/providers";
import { api } from "~/trpc/server";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const code = searchParams.get("code");
		const userId = searchParams.get("state");

		if (!code || !userId) {
			return Response.json({ error: "Invalid request" }, { status: 400 });
		}

		const creds = await slack.exchangeAuthOCodeForAccessToken(code);

		console.log(creds);

		if (!creds || !creds.authed_user?.access_token) {
			return Response.json({ error: "Invalid code" }, { status: 400 });
		}

		const user = await db.query.users.findFirst({
			where: eq(schema.users.id, userId),
		});

		if (!user) {
			throw new Error("User not found");
		}

		await db.insert(schema.providers).values({
			type: "slack",
			userId: user.id,
			label: creds.team?.name ?? "",
			creds: {
				accessToken: creds.authed_user.access_token,
				refreshToken: creds.refresh_token ?? null,
				appId: creds.app_id ?? "",
				scope: creds.scope ?? "",
				teamId: creds.team?.id ?? "",
				tokenType: creds.token_type ?? "",
				teamName: creds.team?.name ?? "",
			},
		});

		return Response.redirect(new URL("/dashboard", request.url));
	} catch (error) {
		console.error(error);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}
