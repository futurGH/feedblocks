<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	import type { InputOutput } from "$lib/flow/types";

	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "number",
			description: "The first number to add",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "number",
			description: "The second number to add",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "number",
			description: "The sum of the provided numbers",
		},
	];
	export const newData = () => ({ inputs: writable<Array<InputOutput>>(inputs) });
	export const title = "add";
	export const description = "Outputs the sum of the provided numbers";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import InputCountControls from "$lib/flow/components/InputCountControls.svelte";

	type $$Props = NodeProps;

	export let data = newData();
	let { inputs: _inputs } = data;
</script>

<BaseNode {title} {description} color="rose" inputs={$_inputs} {outputs} {...$$props}>
	<InputCountControls slot="controls" bind:inputs={_inputs} />
</BaseNode>
