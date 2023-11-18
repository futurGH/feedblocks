import tsEslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

const plugins = {
	"@typescript-eslint": tsEslint,
	"react-hooks": reactHooks,
};

const rules = tsEslint.configs["strict-type-checked"].rules;

const linterOptions = { reportUnusedDisableDirectives: true };

/** @type { import("eslint").Linter.FlatConfig[] } */
const config = [
	{
		files: ["src/**/*.{ts,tsx}"],
		plugins,
		rules: {
			...rules,
			"@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-throw-literal": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
		},
		linterOptions,
		languageOptions: {
			parser,
			parserOptions: { project: "./tsconfig.json" },
			globals: globals.browser,
		},
	},
];
export default config;
