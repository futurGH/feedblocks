<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "posts",
			description: "The posts from the provided feed",
		},
	];
	export const newData = () => ({ uri: writable<string>() });

	export const title = "feed posts";
	export const description = "Outputs all posts from a provided feed";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	export let data = newData();
	let { uri } = data;
</script>

<BaseNode
	{title}
	{description}
	color="slate"
	showHandleNames={false}
	{inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<Input
		slot="additional"
		id={`${id}-input`}
		class="w-36"
		type="text"
		label="Feed"
		placeholder="feed url"
		hideLabel
		bind:value={$uri}
	/>
</BaseNode>
