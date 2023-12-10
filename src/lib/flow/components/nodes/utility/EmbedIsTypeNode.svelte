<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "post",
			type: "post",
			description: "The post to check for an embed",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			type: "boolean",
			description: "Whether the post has an embed of the specified type",
		},
	];
	export const newData = () => ({ embedType: writable<string>() });
	export const title = "embed is type";
	export const description =
		"Outputs whether the provided post has an embed of the specified type.";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import { type Writable, writable } from "svelte/store";
	import Combobox, { type ComboboxItem } from "$lib/components/elements/Combobox.svelte";

	type $$Props = NodeProps;

	export let data = newData();
	let { embedType } = data;

	const embedTypes = [
		{ label: "media", value: "media" },
		{ label: "link", value: "link" },
		{ label: "quote", value: "quote" },
		{ label: "feed", value: "feed" },
	];

	let selected: Writable<ComboboxItem> = writable(embedTypes[0]);
	$: embedType.set($selected.value);
</script>

<BaseNode
	{title}
	{description}
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
		options={embedTypes}
		label="Select an embed type"
		hideLabel
		inFlow
	/>
</BaseNode>
