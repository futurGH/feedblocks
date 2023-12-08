<script context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "datetime",
			description: "The date and time entered",
		},
	];
	export const title = "date and time";
	export const description = "Outputs a provided date and time";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import type { Writable } from "svelte/store";
	import type { ZonedDateTime } from "@internationalized/date";
	import DateTimeInput from "$lib/components/elements/DateTimeInput.svelte";

	type $$Props = NodeProps;

	let value: Writable<ZonedDateTime>;
</script>

<BaseNode
	{title}
	{description}
	color="sky"
	showHandleNames={false}
	{inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<DateTimeInput
		slot="additional"
		class="w-44 justify-center gap-x-0.5 overflow-x-clip px-2"
		label="Date and time"
		hideLabel
		bind:value
	/>
</BaseNode>
