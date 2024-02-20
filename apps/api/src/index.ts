import { Hono } from "hono";
import { logger } from "hono/logger";

import api from "./routers/api";

const app = new Hono();
app.use("*", logger());
app.notFound((c) => {
	return c.json(
		{
			message: "Not found.",
		},
		404,
	);
});
app.onError((error, c) => {
	console.error(error);
	return c.json(
		{
			message: "Internal server error.",
		},
		500,
	);
});

app.route("/api", api);
export default app;
