/** @type {import("tailwindcss").Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{html,svelte,js,ts}"],
	theme: {
		extend: {
			fontSize: {
				"label": "0.8125rem",
				"title": "0.875rem",
			},
			backgroundImage: {
				"header-slate": "linear-gradient(var(--header-bg-slate),var(--header-bg-slate)), var(--node-header-background-gradient)",
				"header-amber": "linear-gradient(var(--header-bg-amber),var(--header-bg-amber)), var(--node-header-background-gradient)",
				"header-sky": "linear-gradient(var(--header-bg-sky),var(--header-bg-sky)), var(--node-header-background-gradient)",
				"header-emerald": "linear-gradient(var(--header-bg-emerald),var(--header-bg-emerald)), var(--node-header-background-gradient)",
				"header-indigo": "linear-gradient(var(--header-bg-indigo),var(--header-bg-indigo)), var(--node-header-background-gradient)",
				"header-rose": "linear-gradient(var(--header-bg-rose),var(--header-bg-rose)), var(--node-header-background-gradient)",
				"header-fuchsia": "linear-gradient(var(--header-bg-fuchsia),var(--header-bg-fuchsia)), var(--node-header-background-gradient)",
			}
		}
	},
	future: { hoverOnlyWhenSupported: true },
	plugins: [],
};
