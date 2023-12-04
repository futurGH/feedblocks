<script context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "posts",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "posts",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "posts",
		},
	];
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

	let selected: Writable<ComboboxItem> = writable(sortOptions[0]);
</script>

<BaseNode
	title="combine"
	color="fuchsia"
	{inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<Combobox
		slot="additional"
		bind:selected
		options={sortOptions}
		label="Select a sort method for the combined post list"
		hideLabel
		inFlow
	/>
</BaseNode>
