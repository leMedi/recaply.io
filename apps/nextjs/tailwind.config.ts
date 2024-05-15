import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@recaply/tailwind-config/web";

export default {
	// We need to append the path to the UI package to the content array so that
	// those classes are included correctly.
	content: [...baseConfig.content, "../../packages/ui/**/*.{ts,tsx}"],
	presets: [baseConfig],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-geist-sans)", ...fontFamily.sans],
				mono: ["var(--font-geist-mono)", ...fontFamily.mono],
			},
			animation: {
				grid: "grid 15s linear infinite",
				"border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
				"spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
				slide: "slide var(--speed) ease-in-out infinite alternate",
			},
			keyframes: {
				grid: {
					"0%": { transform: "translateY(-50%)" },
					"100%": { transform: "translateY(0)" },
				},
				"border-beam": {
					"100%": {
						"offset-distance": "100%",
					},
				},
				"spin-around": {
					"0%": {
						transform: "translateZ(0) rotate(0)",
					},
					"15%, 35%": {
						transform: "translateZ(0) rotate(90deg)",
					},
					"65%, 85%": {
						transform: "translateZ(0) rotate(270deg)",
					},
					"100%": {
						transform: "translateZ(0) rotate(360deg)",
					},
				},
				slide: {
					to: {
						transform: "translate(calc(100cqw - 100%), 0)",
					},
				},
			},
		},
	},
} satisfies Config;
