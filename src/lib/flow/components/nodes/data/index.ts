import * as TextNode from "./TextNode.svelte";
import * as NumberNode from "./NumberNode.svelte";
import * as DateNode from "./DateNode.svelte";
import * as DateTimeNode from "./DateTimeNode.svelte";

export const dataNodes = {
	text: TextNode,
	number: NumberNode,
	date: DateNode,
	datetime: DateTimeNode,
};
export { TextNode, NumberNode, DateNode, DateTimeNode };
