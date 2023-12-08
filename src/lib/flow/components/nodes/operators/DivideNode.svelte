<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "number",
			description: "The number to divide",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "number",
			description: "The number to divide by",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "number",
			description: "The result of the division",
		},
	];
	export const title = "divide";
	export const description = "Divides two numbers";
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
