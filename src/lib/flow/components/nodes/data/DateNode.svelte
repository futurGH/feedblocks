<script context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "date",
		},
	];
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import DateInput from "$lib/components/elements/DateInput.svelte";
	import type { CalendarDate } from "@internationalized/date";
	import type { Writable } from "svelte/store";

	type $$Props = NodeProps;

	let value: Writable<CalendarDate>;
</script>

<BaseNode
	title="date"
	color="sky"
	showHandleNames={false}
	{inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<DateInput
		slot="additional"
		class="w-36 justify-center gap-x-0.5"
		label="Date"
		hideLabel
		bind:value
	/>
</BaseNode>
