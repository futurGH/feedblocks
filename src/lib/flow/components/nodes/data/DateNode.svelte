<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	import type { CalendarDate } from "@internationalized/date";

	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			description: "The date entered",
		},
	];
	export const newData = () => ({ date: writable<CalendarDate>(), outputType: () => "date" });
	export const title = "date";
	export const description = "Outputs a provided date";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import DateInput from "$lib/components/elements/DateInput.svelte";

	type $$Props = NodeProps;

	export let data = newData();
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
