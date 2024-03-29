<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "post[]",
			description: "The first list of posts to combine",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "post[]",
			description: "The second list of posts to combine",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			description: "The combined list of posts",
		},
	];
	export const newData = () => ({ sortMethod: writable<string>(), outputType: () => "post[]" });
	export const title = "combine";
	export const description =
		"Combines two lists of posts into one list based on the selected sort method.";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import { type Writable, writable } from "svelte/store";
	import Combobox, { type ComboboxItem } from "$lib/components/elements/Combobox.svelte";

	type $$Props = NodeProps;

	const sortOptions = [
		{
			label: "creation (newest first)",
			value: "creation-desc",
		},
		{
			label: "creation (oldest first)",
			value: "creation-asc",
		},
		{
			label: "likes (most first)",
			value: "likes-desc",
		},
		{
			label: "likes (fewest first)",
			value: "likes-asc",
		},
		{
			label: "replies (most first)",
			value: "replies-desc",
		},
		{
			label: "replies (fewest first)",
			value: "replies-asc",
		},
		{ label: "concatenate (a first) ", value: "concat-a" },
		{ label: "concatenate (b first) ", value: "concat-b" },
		{
			label: "random",
			value: "random",
		},
	];

	export let data = newData();
	let { sortMethod } = data;

	let selected: Writable<ComboboxItem> = writable(sortOptions[0]);
	$: sortMethod.set($selected.value);
</script>

<BaseNode {title} {description} color="fuchsia" {inputs} {outputs} {...$$props}>
	<Combobox
		slot="additional"
		bind:selected
		options={sortOptions}
		label="Select a sort method for the combined post list"
		hideLabel
		inFlow
	/>
</BaseNode>
