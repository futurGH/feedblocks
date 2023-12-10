<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "number",
			description: "The first number to subtract",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "number",
			description: "The second number to subtract",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "number",
			description: "The result of subtracting two numbers.",
		},
	];
	export const title = "subtract";
	export const description = "Subtracts two numbers";
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
