<script context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "posts",
			type: "posts",
			description: "The posts to filter",
		},
		{
			connectorType: ConnectorType.Condition,
			name: "condition",
			type: "boolean",
			description: "The condition to check",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "posts",
			description: "The posts that do not match the condition",
		},
	];
	export const title = "exclude if";
	export const description = "Outputs posts that do not match the condition";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
</script>

<BaseNode
	{title}
	{description}
	color="fuchsia"
	{inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
/>
