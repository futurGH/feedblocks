<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "date",
			description: "The date entered",
		},
	];
	export const newData = () => ({ date: writable<CalendarDate>() });
	export const title = "date";
	export const description = "Outputs a provided date";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import DateInput from "$lib/components/elements/DateInput.svelte";
	import type { CalendarDate } from "@internationalized/date";
	import type { Writable } from "svelte/store";

	type $$Props = NodeProps;

	export let data: { date: Writable<CalendarDate> } = newData();
	let { date } = data;
</script>

<BaseNode {title} {description} color="sky" showHandleNames={false} {inputs} {outputs} {...$$props}>
	<DateInput
		slot="additional"
		class="w-36 justify-center gap-x-0.5"
		label="Date"
		hideLabel
		bind:value={date}
	/>
</BaseNode>
