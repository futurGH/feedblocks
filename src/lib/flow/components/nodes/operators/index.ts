import * as AndNode from "./AndNode.svelte";
import * as OrNode from "./OrNode.svelte";
import * as NotNode from "./NotNode.svelte";
import * as MathNode from "./MathNode.svelte";
import * as SubtractNode from "./SubtractNode.svelte";
import * as MultiplyNode from "./MultiplyNode.svelte";
import * as DivideNode from "./DivideNode.svelte";
import * as CompareNode from "./CompareNode.svelte";

export const operatorNodes = {
	and: AndNode,
	or: OrNode,
	not: NotNode,
	math: MathNode,
	subtract: SubtractNode,
	multiply: MultiplyNode,
	divide: DivideNode,
	compare: CompareNode,
};
export { AndNode, OrNode, NotNode, MathNode, SubtractNode, MultiplyNode, DivideNode, CompareNode };
