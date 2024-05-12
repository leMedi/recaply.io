import { WebClient } from "@slack/web-api";
import { env } from "./env";

export async function exchangeAuthOCodeForAccessToken(code: string) {
	const web = new WebClient();

	const res = await web.oauth.v2.access({
		client_id: env.SLACK_CLIENT_ID,
		client_secret: env.SLACK_CLIENT_SECRET,
		code,
	});

	if (!res.ok) {
		throw new Error(res.error);
	}

	return res;
}

const scopes = ["channels:history", "im:history", "channels:read", "im:read"];
export function generateSlackAuth0Url(userId: string) {
	const url = new URL("https://slack.com/oauth/v2/authorize");
	url.searchParams.append("client_id", env.SLACK_CLIENT_ID);
	url.searchParams.append("user_scope", scopes.join(","));
	url.searchParams.append(
		"redirect_uri",
		`${env.PUBLIC_URI}/api/callback/auth0/slack`,
	);
	url.searchParams.append("state", userId);

	return url.toString();
}

// export async function getSlackUserInfo(accessToken: string) {
// 	const web = new WebClient(accessToken);

// 	const res = await web.users.identity();

// 	if (!res.ok) {
// 		throw new Error(res.error);
// 	}

// 	return res;
// }

export async function listChannels(accessToken: string) {
	const web = new WebClient(accessToken);

	const result = await web.conversations.list({
		exclude_archived: true,
	});

	if (!result.ok) {
		throw new Error(result.error);
	}

	if (result.channels === undefined) {
		return [];
	}

	return result.channels.map((channel) => ({
		id: channel.id!,
		name: channel.name!,
	}));
}
