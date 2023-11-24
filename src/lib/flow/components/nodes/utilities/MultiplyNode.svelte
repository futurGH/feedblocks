<script lang="ts">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
</script>

<BaseNode
	title="multiply"
	headerColor="bg-header-rose"
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
	on:connect
	on:connectstart
	on:connectend
/>
