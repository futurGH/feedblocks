import * as TextNode from "./TextNode.svelte";
import * as NumberNode from "./NumberNode.svelte";
import * as DateNode from "./DateNode.svelte";
import * as DateTimeNode from "./DateTimeNode.svelte";
import * as PeriodNode from "./PeriodNode.svelte";
import * as RandomNode from "./RandomNode.svelte";
import * as ListNode from "./ListNode.svelte";

export const dataNodes = {
	text: TextNode,
	number: NumberNode,
	date: DateNode,
	datetime: DateTimeNode,
	period: PeriodNode,
	random: RandomNode,
	list: ListNode,
};
export { TextNode, NumberNode, DateNode, DateTimeNode, PeriodNode, RandomNode, ListNode };
