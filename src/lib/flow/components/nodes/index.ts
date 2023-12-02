import { utilityNodes } from "$lib/flow/components/nodes/utility";
import { filterNodes } from "$lib/flow/components/nodes/filter";

export { utilityNodes, MultiplyNode, CompareNode } from "./utility";
export { filterNodes, SortNode } from "./filter";

export const nodeCategories = {
	utility: {
		name: "Utility",
		color: "rose",
		nodes: utilityNodes,
	},
	filter: {
		name: "Filter",
		color: "fuchsia",
		nodes: filterNodes,
	},
};
export const nodeTypeToCategory = {
	...Object.keys(utilityNodes).reduce<Record<string, "utility">>((acc, key) => {
		acc[key] = "utility";
		return acc;
	}, {}),
	...Object.keys(filterNodes).reduce<Record<string, "filter">>((acc, key) => {
		acc[key] = "filter";
		return acc;
	}, {}),
};
