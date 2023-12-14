<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.List,
			name: "list",
			type: "array",
			description: "The list to check",
		},
		{
			connectorType: ConnectorType.Data,
			name: "item",
			type: "any",
			description: "The item to check for",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			type: "boolean",
			description: "Whether the list includes the item",
		},
	];
	export const title = "list includes";
	export const description = "Outputs whether the list includes the item";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
</script>

<BaseNode {title} {description} color="indigo" {inputs} {outputs} {...$$props} />
