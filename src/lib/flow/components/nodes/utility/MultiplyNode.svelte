<script lang="ts">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
</script>

<BaseNode
	title="multiply"
	color="rose"
	inputs={[
		{
			type: ConnectorType.Data,
			name: "a",
		},
		{
			type: ConnectorType.Data,
			name: "b",
		},
	]}
	outputs={[
		{
			type: ConnectorType.Data,
			name: "output",
		},
	]}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
/>
