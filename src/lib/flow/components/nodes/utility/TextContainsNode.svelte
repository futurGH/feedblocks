<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "text",
			type: "string",
			description: "The text to search in",
		},
		{
			connectorType: ConnectorType.Data,
			name: "query",
			type: "string",
			description: "The query to search for",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			type: "boolean",
			description: "Whether the text contains the query",
		},
	];
	export const title = "text contains";
	export const description = "Outputs whether the text contains the query.";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
</script>

<BaseNode {title} {description} color="indigo" {inputs} {outputs} {...$$props} />
