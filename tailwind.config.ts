import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-geist-sans)", ...fontFamily.sans]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				primary: {
					50: '#f0f9ff',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1'
				}
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
	],
} satisfies Config;
