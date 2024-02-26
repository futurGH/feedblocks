<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.List,
			name: "list",
			type: "array",
			description: "The list to exclude from",
		},
		{
			connectorType: ConnectorType.List,
			name: "exclude",
			type: "array",
			description: "The list of items to exclude from the first list",
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
	export const title = "exclude list";
	export const description =
		"Excludes the items in the second list from the first list and outputs the combined list";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
</script>

<BaseNode {title} {description} color="fuchsia" {inputs} {outputs} {...$$props} />
