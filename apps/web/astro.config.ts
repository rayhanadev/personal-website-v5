import path from "node:path";
import fs from "node:fs";

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import tailwind from "@astrojs/tailwind";
import { defineConfig, passthroughImageService } from "astro/config";
import compress from "astro-compressor";
import critters from "astro-critters";
import robotstxt from "astro-robots-txt";
import serviceworker from "astrojs-service-worker";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import million from "million/compiler";
import postcssFontpath from "postcss-fontpath";
import postcssImport from "postcss-import";
import postcssScrollbar from "postcss-scrollbar";
import Icons from "unplugin-icons/vite";

import shiki from "./shiki.json";

const DEV = process.env.NODE_ENV === "development";
const BASE_URL = DEV ? "http://localhost:3000" : "https://www.rayhanadev.com";

export default defineConfig({
	site: BASE_URL,
	output: "hybrid",
	adapter: cloudflare({
		mode: "advanced",
	}),
	server: { port: 5137 },
	integrations: [
		react(),
		prefetch(),
		sitemap({
			customPages: [],
		}),
		robotstxt({
			host: "www.rayhanadev.com",
			policy: [{ disallow: "/cdn-cgi/", userAgent: "*" }],
		}),
		tailwind({
			configFile: "./tailwind.config.ts",
			applyBaseStyles: false,
		}),
		critters({ Logger: 1 }),
		compress(),
		DEV && serviceworker(),
	],
	markdown: {
		// @ts-ignore: any vscode theme config
		// satisfies shiki theme configuration
		shikiConfig: { theme: shiki },
	},
	image: {
		service: passthroughImageService(),
	},
	vite: {
		css: {
			postcss: {
				plugins: [
					postcssImport(),
					postcssFontpath({
						formats: [{ type: "woff2", ext: "woff2" }],
					}),
					postcssScrollbar(),
					autoprefixer(),
					cssnano(),
				],
			},
		},
		plugins: [
			rawFonts([".ttf"]),
			million.vite({
				mode: "react",
				server: true,
				auto: true,
			}),
			Icons({ compiler: "jsx", jsx: "react" }),
			Icons({ compiler: "astro" }),
		],
		optimizeDeps: { exclude: ["@resvg/resvg-js"] },
	},
});

function rawFonts(ext) {
	return {
		name: "vite-plugin-raw-fonts",
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}
