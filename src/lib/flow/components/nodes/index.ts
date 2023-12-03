import { operatorNodes } from "./operators";
import { filterNodes } from "./filter";

export { operatorNodes, MultiplyNode, CompareNode } from "./operators";
export { filterNodes, SortNode } from "./filter";

export const nodeCategories = {
	operators: {
		name: "Operators",
		color: "rose",
		nodes: operatorNodes,
	},
	filter: {
		name: "Filter",
		color: "fuchsia",
		nodes: filterNodes,
	},
};
export const nodeTypeToCategory = {
	...Object.keys(operatorNodes).reduce<Record<string, "operators">>((acc, key) => {
		acc[key] = "operators";
		return acc;
	}, {}),
	...Object.keys(filterNodes).reduce<Record<string, "filter">>((acc, key) => {
		acc[key] = "filter";
		return acc;
	}, {}),
};
