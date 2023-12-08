<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "input",
			type: "boolean",
			description: "The condition to invert",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "output",
			type: "boolean",
			description: "The inverted condition",
		},
	];
	export const title = "not";
	export const description = "Inverts the input condition";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
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
/>
