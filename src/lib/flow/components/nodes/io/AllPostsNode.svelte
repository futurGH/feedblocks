<script lang="ts" context="module">
	import { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			description: "All posts from the Bluesky network",
		},
	];
	export const newData = () => ({ outputType: () => "post[]" });
	export const title = "all posts";
	export const description = "Outputs all posts from the Bluesky network";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import BaseNode from "$lib/flow/components/nodes/BaseNode.svelte";

	type $$Props = NodeProps;

	export const data = newData();
</script>

<BaseNode {title} {description} color="slate" {inputs} {outputs} hasBody={false} {...$$props} />
