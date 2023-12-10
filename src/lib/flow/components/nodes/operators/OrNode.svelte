<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "a",
			type: "boolean",
			description: "The first condition to check",
		},
		{
			connectorType: ConnectorType.Condition,
			name: "b",
			type: "boolean",
			description: "The second condition to check",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "output",
			type: "boolean",
			description: "Whether any input condition is true",
		},
	];
	export const title = "or";
	export const description = "Outputs whether any input condition is true";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import InputCountControls from "$lib/flow/components/InputCountControls.svelte";
	import { writable } from "svelte/store";

	type $$Props = NodeProps;

	let _inputs = writable(inputs);
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
