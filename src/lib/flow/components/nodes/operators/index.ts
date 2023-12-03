import * as MultiplyNode from "$lib/flow/components/nodes/operators/MultiplyNode.svelte";
import * as CompareNode from "$lib/flow/components/nodes/operators/CompareNode.svelte";

export const operatorNodes = {
	multiply: MultiplyNode,
	compare: CompareNode,
};
export { MultiplyNode, CompareNode };
