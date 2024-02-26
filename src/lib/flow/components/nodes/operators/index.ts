import * as AndNode from "./AndNode.svelte";
import * as OrNode from "./OrNode.svelte";
import * as NotNode from "./NotNode.svelte";
import * as MathNode from "./MathNode.svelte";
import * as CompareNode from "./CompareNode.svelte";

export const operatorNodes = {
	and: AndNode,
	or: OrNode,
	not: NotNode,
	math: MathNode,
	compare: CompareNode,
};
export { AndNode, OrNode, NotNode, MathNode, CompareNode };
