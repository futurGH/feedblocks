<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "number",
			description: "A random integer between the minimum and maximum values entered",
		},
	];
	export const newData = () => ({
		min: writable<number>(0),
		max: writable<number>(0),
		outputType: () => "number",
	});
	export const title = "random";
	export const description =
		"Outputs a random integer between the provided minimum and maximum values.";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	export let data = newData();
	let { min, max } = data;

	let minValue: string;
	let maxValue: string;

	$: min.set(Number(minValue || 0));
	$: max.set(Number(maxValue || 0));
</script>

<BaseNode {title} {description} color="sky" showHandleNames={false} {inputs} {outputs} {...$$props}>
	<div slot="additional" class="flex flex-row items-center gap-x-3">
		<Input
			id={`${id}-min`}
			class="w-16 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			type="number"
			label="Minimum"
			hideLabel
			bind:value={minValue}
		/>
		<span class="font-medium text-zinc-900/75 text-label dark:text-zinc-100/80">to</span>
		<Input
			id={`${id}-max`}
			class="w-16 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			type="number"
			label="Maximum"
			hideLabel
			bind:value={maxValue}
		/>
	</div>
</BaseNode>
