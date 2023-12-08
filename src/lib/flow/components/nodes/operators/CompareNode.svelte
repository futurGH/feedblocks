<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "any",
			description: "The first value to compare",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "any",
			description: "The second value to compare",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			type: "boolean",
			description: "Whether the two inputs meet the specified condition",
		},
	];
	export const title = "compare";
	export const description = "Output whether the two inputs meet the specified condition";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import { writable, type Writable } from "svelte/store";
	import type { SelectOption } from "@melt-ui/svelte";
	import Select from "$lib/components/elements/Select.svelte";

	type $$Props = NodeProps;

	const options = ["a > b", "a < b", "a = b", "a ≥ b", "a ≤ b"];

	let selected: Writable<SelectOption<string>> = writable({ value: options[0] });

	// TODO: add error when input types don't match up
	// waiting on https://github.com/xyflow/xyflow/pull/3688
</script>

<BaseNode
	{title}
	{description}
	color="rose"
	{inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<Select
		slot="additional"
		bind:selected
		{options}
		label="Select a comparison method"
		hideLabel
		inFlow
	/>
</BaseNode>
