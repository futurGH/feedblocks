import * as RegexNode from "./RegexNode.svelte";
import * as TextContainsNode from "./TextContainsNode.svelte";
import * as JoinTextNode from "./JoinTextNode.svelte";
import * as ListIncludesNode from "./ListIncludesNode.svelte";
import * as ExistsNode from "./ExistsNode.svelte";
import * as PostIsTypeNode from "./PostIsTypeNode.svelte";
import * as PostHasLabelNode from "./PostHasLabelNode.svelte";
import * as EmbedIsTypeNode from "./EmbedIsTypeNode.svelte";

export const utilityNodes = {
	regex: RegexNode,
	textContains: TextContainsNode,
	joinText: JoinTextNode,
	listIncludes: ListIncludesNode,
	exists: ExistsNode,
	postIsType: PostIsTypeNode,
	postHasLabel: PostHasLabelNode,
	embedIsType: EmbedIsTypeNode,
};
export {
	RegexNode,
	TextContainsNode,
	JoinTextNode,
	ListIncludesNode,
	ExistsNode,
	PostIsTypeNode,
	PostHasLabelNode,
	EmbedIsTypeNode,
};
