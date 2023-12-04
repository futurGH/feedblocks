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
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import { type Writable, writable } from "svelte/store";
	import Combobox, { type ComboboxItem } from "$lib/components/elements/Combobox.svelte";

	type $$Props = NodeProps;

	const embedTypes = [
		{ label: "media", value: "media" },
		{ label: "link", value: "link" },
		{ label: "quote", value: "quote" },
		{ label: "feed", value: "feed" },
	];

	let selected: Writable<ComboboxItem> = writable(embedTypes[0]);
</script>

<BaseNode
	title="embed is type"
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
