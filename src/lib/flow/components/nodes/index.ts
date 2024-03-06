import { inputOutputNodes } from "./io";
import { selectNodes } from "./select";
import { dataNodes } from "./data";
import { listNodes } from "./lists";
import { utilityNodes } from "./utility";
import { operatorNodes } from "./operators";
import { filterNodes } from "./filter";

export {
	inputOutputNodes,
	selectNodes,
	dataNodes,
	listNodes,
	utilityNodes,
	operatorNodes,
	filterNodes,
};

export const nodeCategories = {
	io: {
		name: "Input/Output",
		color: "slate",
		nodes: inputOutputNodes,
	},
	select: {
		name: "Select Property",
		color: "amber",
		nodes: selectNodes,
	},
	filter: {
		name: "Filter",
		color: "fuchsia",
		nodes: filterNodes,
	},
	lists: {
		name: "Lists",
		color: "emerald",
		nodes: listNodes,
	},
	utility: {
		name: "Utility",
		color: "indigo",
		nodes: utilityNodes,
	},
	data: {
		name: "Data",
		color: "sky",
		nodes: dataNodes,
	},
	operators: {
		name: "Operators",
		color: "rose",
		nodes: operatorNodes,
	},
};
export const nodeTypeToCategory = {
	...Object.keys(inputOutputNodes).reduce<Record<string, "io">>((acc, key) => {
		acc[key] = "io";
		return acc;
	}, {}),
	...Object.keys(selectNodes).reduce<Record<string, "select">>((acc, key) => {
		acc[key] = "select";
		return acc;
	}, {}),
	...Object.keys(dataNodes).reduce<Record<string, "data">>((acc, key) => {
		acc[key] = "data";
		return acc;
	}, {}),
	...Object.keys(listNodes).reduce<Record<string, "lists">>((acc, key) => {
		acc[key] = "lists";
		return acc;
	}, {}),
	...Object.keys(utilityNodes).reduce<Record<string, "utility">>((acc, key) => {
		acc[key] = "utility";
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

export const allNodes = {
	...inputOutputNodes,
	...selectNodes,
	...filterNodes,
	...listNodes,
	...utilityNodes,
	...dataNodes,
	...operatorNodes,
};
