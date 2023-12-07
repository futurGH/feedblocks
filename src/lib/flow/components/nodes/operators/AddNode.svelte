<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "number",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "number",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "number",
		},
	];
	export const title = "add";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import InputCountControls from "$lib/flow/components/InputCountControls.svelte";

	type $$Props = NodeProps;

	let _inputs = inputs;
</script>

<BaseNode
	{title}
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
