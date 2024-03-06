<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "item",
			type: "any",
			description: "The item to check",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			description: "Whether the item exists",
		},
	];
	export const newData = () => ({ outputType: () => "boolean" });
	export const title = "exists";
	export const description = "Outputs whether the provided item exists";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;
</script>

<BaseNode {title} {description} color="indigo" {inputs} {outputs} {...$$props} />
