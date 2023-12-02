<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "any",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "any",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			type: "boolean",
		},
	];
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import { writable, type Writable } from "svelte/store";
	import type { SelectOption } from "@melt-ui/svelte";
	import Select from "$lib/components/elements/Select.svelte";

	type $$Props = NodeProps;

	const options = ["a > b", "a < b", "a = b", "a ≥ b", "a ≤ b"];

	let selected: Writable<SelectOption<string>> = writable({ value: options[0] });
</script>

<BaseNode
	title="compare"
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
