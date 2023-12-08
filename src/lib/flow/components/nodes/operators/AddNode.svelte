<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
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
	export const title = "add";
	export const description = "Outputs the sum of the provided numbers";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import InputCountControls from "$lib/flow/components/InputCountControls.svelte";

	type $$Props = NodeProps;

	let _inputs = inputs;
</script>

<BaseNode
	{title}
	{description}
	color="rose"
	inputs={_inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<InputCountControls slot="controls" bind:inputs={_inputs} />
</BaseNode>
