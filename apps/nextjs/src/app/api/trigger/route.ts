import { triggerDev } from "@recaply/jobs";
import { createAppRoute } from "@trigger.dev/nextjs";

import "@recaply/jobs";

//this route is used to send and receive data with Trigger.dev
export const { POST, dynamic } = createAppRoute(triggerDev);

//uncomment this to set a higher max duration (it must be inside your plan limits). Full docs: https://vercel.com/docs/functions/serverless-functions/runtimes#max-duration
export const runtime = "nodejs";
export const maxDuration = 10;
