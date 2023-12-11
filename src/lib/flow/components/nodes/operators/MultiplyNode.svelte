<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import type { InputOutput } from "$lib/flow/types";
	import { writable } from "svelte/store";

	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "number",
			description: "The first number to multiply",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "number",
			description: "The second number to multiply",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "number",
			description: "The product of the provided numbers",
		},
	];
	export const newData = () => ({ inputs: writable<Array<InputOutput>>(inputs) });
	export const title = "multiply";
	export const description = "Multiplies the provided numbers";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import InputCountControls from "$lib/flow/components/InputCountControls.svelte";

	type $$Props = NodeProps;

	export let data = newData();
	let { inputs: _inputs } = data;
</script>

<BaseNode
	{title}
	{description}
	color="rose"
	inputs={$_inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<InputCountControls slot="controls" bind:inputs={_inputs} />
</BaseNode>
