<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.List,
			name: "a",
			type: "any[]",
			description: "The first list to intersect",
		},
		{
			connectorType: ConnectorType.List,
			name: "b",
			type: "any[]",
			description: "The second list to intersect",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.List,
			name: "output",
			description: "The combined list",
		},
	];
	export const newData = () => ({ outputType: () => "any[]" });
	export const title = "intersect list";
	export const description = "Outputs a list of items that are present in both input lists";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import { resolveInputTypes } from "$lib/conversion/util";

	type $$Props = NodeProps;

	export let data = newData();
	data.outputType = () => {
		const { a, b } = resolveInputTypes($$props.id);
		if (!a || !b) return "invalid";
		if (a === "invalid" || b === "invalid") return "invalid";
		if (a !== b) return "invalid";
		if (a === "any[]" && b === "any[]") return "any[]";
		return a;
	};
</script>

<BaseNode {title} {description} color="fuchsia" {inputs} {outputs} {...$$props} />
