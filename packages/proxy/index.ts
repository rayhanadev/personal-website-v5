import Fastify from "fastify";
import proxy from "@fastify/http-proxy";
import waitPort from "wait-port";

const server = Fastify();

server.register(proxy, {
	prefix: "/",
	websocket: true,
	upstream: "http://localhost:8788",
	wsUpstream: "http://localhost:8788",
});

server.register(proxy, {
	prefix: "/cdn-cgi",
	rewritePrefix: "/cdn-cgi",
	websocket: true,
	upstream: "http://localhost:37167",
	wsUpstream: "http://localhost:37167",
});

server.register(proxy, {
	prefix: "/api",
	rewritePrefix: "/api",
	upstream: "http://localhost:8787",
});

async function main() {
	console.log("Waiting for Cloudflare Dev Workers to start...");
	await Promise.all([
		waitPort({ host: "localhost", port: 8787, output: "silent" }),
		waitPort({ host: "localhost", port: 8788, output: "silent" }),
	]);

	server.listen({ port: 3000, host: "0.0.0.0" });
	console.log("Proxied connections available at https://localhost:3000/");
}

main();
