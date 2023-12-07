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
	export const title = "all posts";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
</script>

<BodylessNode
	{title}
	color="slate"
	handleType="source"
	handle={outputs[0]}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
/>
