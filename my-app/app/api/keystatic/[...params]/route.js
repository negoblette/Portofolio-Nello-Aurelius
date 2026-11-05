import { makeRouteHandler } from "@keystatic/next/route-handler";
import { keystaticReady } from "@/lib/keystatic-ready";
import config from "@/keystatic.config";

const notFound = () => new Response("Not found", { status: 404 });

export const { GET, POST } = keystaticReady ? makeRouteHandler({ config }) : { GET: notFound, POST: notFound };
