<script context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "post",
			type: "post",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			type: "boolean",
		},
	];
	export const title = "post is type";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import { type Writable, writable } from "svelte/store";
	import Combobox, { type ComboboxItem } from "$lib/components/elements/Combobox.svelte";

	type $$Props = NodeProps;

	const postTypes = [
		{ label: "post", value: "post" },
		{ label: "reply", value: "reply" },
		{ label: "repost", value: "repost" },
		{ label: "quote", value: "quote" },
	];

	let selected: Writable<ComboboxItem> = writable(postTypes[0]);
</script>

<BaseNode
	{title}
	color="indigo"
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
		options={postTypes}
		label="Select a post type"
		hideLabel
		inFlow
	/>
</BaseNode>
