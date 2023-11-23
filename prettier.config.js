/** @type {import("prettier").Config} */
export default {
	trailingComma: "es5",
	tabWidth: 4,
	printWidth: 100,
	useTabs: true,
	plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
	overrides: [
		{
			files: "**/*.svelte",
			options: {
				parser: "svelte",
			},
		},
	],
};
