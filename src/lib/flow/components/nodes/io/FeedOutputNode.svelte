<script lang="ts" context="module">
	import BodylessNode from "$lib/flow/components/nodes/BodylessNode.svelte";
	import { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "posts",
			description: "The posts that this feed should output",
		},
	];
	export const outputs = [];
	export const title = "feed output";
	export const description = "The output of this feed";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
</script>

<BodylessNode
	{title}
	{description}
	color="slate"
	handleType="target"
	handle={inputs[0]}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
/>
