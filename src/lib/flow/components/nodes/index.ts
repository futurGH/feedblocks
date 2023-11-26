import { utilityNodes } from "$lib/flow/components/nodes/utility";

export { utilityNodes, MultiplyNode } from "./utility";

export const nodeCategories = {
	utility: {
		name: "Utility",
		color: "rose",
		nodes: utilityNodes,
	},
};
export const nodeTypeToCategory = {
	...Object.keys(utilityNodes).reduce<Record<string, "utility">>((acc, key) => {
		acc[key] = "utility";
		return acc;
	}, {}),
};
