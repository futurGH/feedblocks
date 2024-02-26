import * as SortNode from "./SortNode.svelte";
import * as CombineNode from "./CombineNode.svelte";
import * as ExcludeIfNode from "./ExcludeIfNode.svelte";
import * as IncludeIfNode from "./IncludeIfNode.svelte";
import * as ExcludeListNode from "./ExcludeListNode.svelte";
import * as IntersectListNode from "./IntersectListNode.svelte";

export const filterNodes = {
	sort: SortNode,
	combine: CombineNode,
	excludeIf: ExcludeIfNode,
	includeIf: IncludeIfNode,
	excludeList: ExcludeListNode,
	intersectList: IntersectListNode,
};
export { SortNode, CombineNode, ExcludeIfNode, IncludeIfNode, ExcludeListNode, IntersectListNode };
