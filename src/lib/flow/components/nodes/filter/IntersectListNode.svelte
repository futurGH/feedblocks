<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.List,
			name: "a",
			type: "array",
			description: "The first list to intersect",
		},
		{
			connectorType: ConnectorType.List,
			name: "b",
			type: "array",
			description: "The second list to intersect",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.List,
			name: "output",
			type: "array",
			description: "The combined list",
		},
	];
	export const title = "intersect list";
	export const description = "Outputs a list of items that are present in both input lists";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
</script>

<BaseNode {title} {description} color="fuchsia" {inputs} {outputs} {...$$props} />
