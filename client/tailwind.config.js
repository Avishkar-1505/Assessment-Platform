/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
	"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
				"dark-layer-1": "rgb(40,40,40)",
				"dark-layer-2": "rgb(26,26,26)",
				"dark-label-2": "rgba(239, 241, 246, 0.75)",
				"dark-divider-border-2": "rgb(61, 61, 61)",
				"dark-fill-2": "hsla(0,0%,100%,.14)",
				"dark-fill-3": "hsla(0,0%,100%,.1)",
				"dark-gray-6": "rgb(138, 138, 138)",
				"dark-gray-7": "rgb(179, 179, 179)",
				"gray-8": "rgb(38, 38, 38)",
				"dark-gray-8": "rgb(219, 219, 219)",
				"brand-orange": "rgb(255 161 22)",
				"brand-orange-s": "rgb(193, 122, 15)",
				"dark-yellow": "rgb(255 192 30)",
				"dark-pink": "rgb(255 55 95)",
				"olive": "rgb(0, 184, 163)",
				"dark-green-s": "rgb(44 187 93)",
				"dark-blue-s": "rgb(29 53 87)",
				"steel-blue" : "rgb(69 123 157)",
				richblack: {
					5: "#F1F2FF",
					25: "#DBDDEA",
					50: "#F1FAEE",
					100: "#AFB2BF",
					200: "#999DAA",
					300: "#838894",
					400: "#6E727F",
					500: "#585D69",
					600: "#424854",
					700: "#2C333F",
					800: "#161D29",
					900: "#000814",
				},
			},
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

