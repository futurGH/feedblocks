import * as AndNode from "./AndNode.svelte";
import * as OrNode from "./OrNode.svelte";
import * as NotNode from "./NotNode.svelte";
import * as AddNode from "./AddNode.svelte";
import * as SubtractNode from "./SubtractNode.svelte";
import * as MultiplyNode from "./MultiplyNode.svelte";
import * as DivideNode from "./DivideNode.svelte";
import * as CompareNode from "./CompareNode.svelte";

export const operatorNodes = {
	and: AndNode,
	or: OrNode,
	not: NotNode,
	add: AddNode,
	subtract: SubtractNode,
	multiply: MultiplyNode,
	divide: DivideNode,
	compare: CompareNode,
};
export { AndNode, OrNode, NotNode, AddNode, SubtractNode, MultiplyNode, DivideNode, CompareNode };
