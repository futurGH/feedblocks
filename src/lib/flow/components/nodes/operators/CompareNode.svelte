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
	export const newData = () => ({ comparator: writable<string>() });
	export const title = "compare";
	export const description = "Output whether the two inputs meet the specified condition";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import { writable, type Writable } from "svelte/store";
	import type { SelectOption } from "@melt-ui/svelte";
	import Select from "$lib/components/elements/Select.svelte";

	type $$Props = NodeProps;

	export let data = newData();
	let { comparator } = data;

	const comparators = [
		{ label: "a > b", value: ">" },
		{ label: "a < b", value: "<" },
		{ label: "a = b", value: "=" },
		{ label: "a ≥ b", value: ">=" },
		{ label: "a ≤ b", value: "<=" },
	];

	let selected: Writable<SelectOption<string>> = writable(comparators[0]);
	$: comparator.set($selected.value);

	// TODO: add error when input types don't match up
	// waiting on https://github.com/xyflow/xyflow/pull/3688
</script>

<BaseNode {title} {description} color="rose" {inputs} {outputs} {...$$props}>
	<Select
		slot="additional"
		bind:selected
		options={comparators}
		label="Select a comparison method"
		hideLabel
		inFlow
	/>
</BaseNode>
