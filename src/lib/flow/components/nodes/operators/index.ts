import * as MultiplyNode from "./MultiplyNode.svelte";
import * as CompareNode from "./CompareNode.svelte";
import * as AddNode from "./AddNode.svelte";

export const operatorNodes = {
	add: AddNode,
	multiply: MultiplyNode,
	compare: CompareNode,
};
export { AddNode, MultiplyNode, CompareNode };
