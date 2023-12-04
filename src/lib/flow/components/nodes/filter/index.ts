import * as SortNode from "./SortNode.svelte";
import * as CombineNode from "./CombineNode.svelte";
import * as ExcludeIfNode from "./ExcludeIfNode.svelte";
import * as IncludeIfNode from "./IncludeIfNode.svelte";

export const filterNodes = {
	sort: SortNode,
	combine: CombineNode,
	excludeIf: ExcludeIfNode,
	includeIf: IncludeIfNode,
};
export { SortNode, CombineNode, ExcludeIfNode, IncludeIfNode };
