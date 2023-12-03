import { dataNodes } from "./data";
import { listNodes } from "./lists";
import { operatorNodes } from "./operators";
import { filterNodes } from "./filter";

export { dataNodes, listNodes, operatorNodes, filterNodes };

export const nodeCategories = {
	data: {
		name: "Data",
		color: "sky",
		nodes: dataNodes,
	},
	lists: {
		name: "Lists",
		color: "emerald",
		nodes: listNodes,
	},
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
	...Object.keys(dataNodes).reduce<Record<string, "data">>((acc, key) => {
		acc[key] = "data";
		return acc;
	}, {}),
	...Object.keys(listNodes).reduce<Record<string, "lists">>((acc, key) => {
		acc[key] = "lists";
		return acc;
	}, {}),
	...Object.keys(operatorNodes).reduce<Record<string, "operators">>((acc, key) => {
		acc[key] = "operators";
		return acc;
	}, {}),
	...Object.keys(filterNodes).reduce<Record<string, "filter">>((acc, key) => {
		acc[key] = "filter";
		return acc;
	}, {}),
};
