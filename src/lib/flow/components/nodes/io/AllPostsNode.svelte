<script lang="ts" context="module">
	import BodylessNode from "$lib/flow/components/nodes/BodylessNode.svelte";
	import { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "all posts",
			type: "posts",
		},
	];
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
</script>

<BodylessNode
	title="all posts"
	color="slate"
	handleType="source"
	handle={outputs[0]}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
/>
