<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "string",
			description: "The first string to join",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "string",
			description: "The second string to join",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			description: "The joined string",
		},
	];
	export const newData = () => ({ outputType: () => "string" });
	export const title = "join text";
	export const description = "Joins two strings of text together";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";

	type $$Props = NodeProps;

	export const data = newData();
</script>

<BaseNode {title} {description} color="indigo" {inputs} {outputs} {...$$props} />
