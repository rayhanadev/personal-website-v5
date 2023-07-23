import path from "node:path";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import { defineConfig } from "astro/config";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssFontpath from "postcss-fontpath";
import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting/index";

const BASE_URL = "https://admin.rayhanadev.com";

// https://astro.build/config
export default defineConfig({
	site: BASE_URL,
	output: "static",
	integrations: [
		react(),
		sitemap({
			customPages: [],
		}),
	],
	vite: {
		css: {
			postcss: {
				options: {},
				plugins: [
					postcssImport(),
					postcssFontpath({
						formats: [{ type: "woff2", ext: "woff2" }],
					}),
					tailwindcssNesting(),
					tailwindcss({ config: resolveTailwindConfig() }),
					autoprefixer(),
					cssnano(),
				],
			},
		},
	},
});

function resolveTailwindConfig() {
	return {
		content: [`${process.cwd()}/src/**/*.{tsx,astro}`],
		theme: {
			colors: ({ colors }) => ({
				inherit: colors.inherit,
				current: colors.current,
				transparent: colors.transparent,
				background: {
					root: "#14131E",
					default: "#1F1E2E",
					higher: "#2A293D",
					highest: "#35344D",
					overlay: "#14131EA0",
					DEFAULT: "#1F1E2E",
				},
				foreground: {
					default: "#F3F3F3",
					dimmer: "#D9D9D9",
					dimmest: "#BFBFBF",
					DEFAULT: "#F3F3F3",
				},
				outline: {
					dimmest: "#2A293D",
					dimmer: "#35344D",
					default: "#41405C",
					stronger: "#4E4C6E",
					strongest: "#5B5A81",
					DEFAULT: "#41405C",
				},
				primary: {
					dimmest: "#2C4C59",
					dimmer: "#3C6372",
					default: "#4F7C8A",
					stronger: "#6395A3",
					strongest: "#7AAFBB",
				},
				positive: {
					dimmest: "#368F46",
					dimmer: "#449C53",
					default: "#53A962",
					stronger: "#63B671",
					strongest: "#75C282",
				},
				negative: {
					dimmest: "#800F0F",
					dimmer: "#932020",
					default: "#A63434",
					stronger: "#B84C4C",
					strongest: "#CB6868",
				},
			}),
			fontFamily: {
				mono: [
					'"Victor Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
					{ fontFeatureSettings: '"ss05", "ss06", "ss07"' },
				],
			},
			extend: {},
		},
	};
}
