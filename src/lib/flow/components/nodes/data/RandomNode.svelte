<script context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "number",
		},
	];
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	let min: number;
	let max: number;
</script>

<BaseNode
	title="random"
	color="sky"
	showHandleNames={false}
	{inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<div slot="additional" class="flex flex-row items-center gap-x-3">
		<Input
			id={`${id}-min`}
			class="w-16 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			type="number"
			label="Minimum"
			hideLabel
			bind:value={min}
		/>
		<span class="font-medium text-zinc-900/75 text-label dark:text-zinc-100/80">to</span>
		<Input
			id={`${id}-max`}
			class="w-16 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			type="number"
			label="Maximum"
			hideLabel
			bind:value={max}
		/>
	</div>
</BaseNode>
