<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "post",
			type: "post",
			description: "The post to check the type of",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			type: "boolean",
			description: "Whether the post is of the specified type",
		},
	];
	export const newData = () => ({ postType: writable<string>() });
	export const title = "post is type";
	export const description = "Outputs whether a post is of the specified type";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import { type Writable, writable } from "svelte/store";
	import Combobox, { type ComboboxItem } from "$lib/components/elements/Combobox.svelte";

	type $$Props = NodeProps;

	export let data = newData();
	let { postType } = data;

	const postTypes = [
		{ label: "post", value: "post" },
		{ label: "reply", value: "reply" },
		{ label: "repost", value: "repost" },
		{ label: "quote", value: "quote" },
	];

	let selected: Writable<ComboboxItem> = writable(postTypes[0]);
	$: postType.set($selected.value);
</script>

<BaseNode {title} {description} color="indigo" {inputs} {outputs} {...$$props}>
	<Combobox
		slot="additional"
		bind:selected
		options={postTypes}
		label="Select a post type"
		hideLabel
		inFlow
	/>
</BaseNode>
