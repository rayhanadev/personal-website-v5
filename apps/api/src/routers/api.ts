import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
	VIEWS: KVNamespace;
};

const api = new Hono<{ Bindings: Bindings }>();
api.use("/views/*", cors());

api.get("/views", async (c) => {
	const path = c.req.query("path");

	if (!path) {
		return c.json(
			{
				success: false,
				message: "Missing path parameter.",
			},
			400,
		);
	}

	const { VIEWS } = c.env;

	const key = btoa(path);
	const count = Number(await VIEWS.get(key));

	if (!count || Number.isNaN(count)) {
		return c.json(
			{
				success: true,
				data: { count: 0 },
			},
			200,
		);
	}

	return c.json(
		{
			success: true,
			data: { count },
		},
		200,
	);
});

api.put("/views", async (c) => {
	const path = c.req.query("path");

	if (!path) {
		return c.json(
			{
				success: false,
				message: "Missing path parameter.",
			},
			400,
		);
	}

	const { VIEWS } = c.env;

	const key = btoa(path);
	const count = Number(await VIEWS.get(key));

	if (!count || Number.isNaN(count)) {
		await VIEWS.put(key, String(1));
	} else {
		await VIEWS.put(key, String(count + 1));
	}

	return c.json(
		{
			success: true,
			message: "Updated view count.",
		},
		200,
	);
});

export default api;
