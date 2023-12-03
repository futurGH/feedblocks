<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "a",
			type: "boolean",
		},
		{
			connectorType: ConnectorType.Condition,
			name: "b",
			type: "boolean",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "output",
			type: "boolean",
		},
	];
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import InputCountControls from "$lib/flow/components/InputCountControls.svelte";

	type $$Props = NodeProps;

	let _inputs = inputs;
</script>

<BaseNode
	title="or"
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
