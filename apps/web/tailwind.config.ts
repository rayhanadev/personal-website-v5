import resolveConfig from "tailwindcss/resolveConfig.js";
import typography from "@tailwindcss/typography";

export default resolveConfig({
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
				dimmer: "#C0C0C0",
				dimmest: "#616081",
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
		extend: {
			width: {
				"104": "26rem",
				"112": "28rem",
				"120": "30rem",
				"128": "32rem",
				"144": "36rem",
			},
			// @ts-ignore: @tailwindcss/typography cannot type this
			//             function so we ignore any errors here.
			typography: ({ theme }) => ({
				white: {
					css: {
						"--tw-prose-body": theme("colors.foreground[dimmer]"),
						"--tw-prose-headings": theme("colors.foreground[default]"),
						"--tw-prose-lead": theme("colors.foreground[dimmest]"),
						"--tw-prose-links": theme("colors.foreground[default]"),
						"--tw-prose-bold": theme("colors.foreground[default]"),
						"--tw-prose-counters": theme("colors.background[highest]"),
						"--tw-prose-bullets": theme("colors.background[highest]"),
						"--tw-prose-hr": theme("colors.background[highest]"),
						"--tw-prose-quotes": theme("colors.foreground[default]"),
						"--tw-prose-quote-borders": theme("colors.background[highest]"),
						"--tw-prose-captions": theme("colors.foreground[dimmest]"),
						"--tw-prose-code": theme("colors.foreground[default]"),
						"--tw-prose-pre-code": theme("colors.foreground[default]"),
						"--tw-prose-pre-bg": theme("colors.background[default]"),
						"--tw-prose-th-borders": theme("colors.background[highest]"),
						"--tw-prose-td-borders": theme("colors.background[highest]"),
					},
				},
			}),
		},
	},
	plugins: [typography],
});
