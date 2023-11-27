<script lang="ts">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
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
		{
			label: "random",
			value: "random",
		},
	];

	let selected: Writable<ComboboxItem> = writable(sortOptions[0]);
</script>

<BaseNode
	title="sort"
	color="fuchsia"
	inputs={[
		{
			type: ConnectorType.Data,
			name: "posts",
		},
	]}
	outputs={[
		{
			type: ConnectorType.Data,
			name: "output",
		},
	]}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<Combobox
		slot="additional"
		bind:selected
		options={sortOptions}
		label="Select a sort method"
		hideLabel
		inFlow
	/>
</BaseNode>
