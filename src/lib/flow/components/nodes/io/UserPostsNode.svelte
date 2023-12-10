<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "posts",
			description: "All posts from the provided user",
		},
	];
	export const newData = () => ({ handle: writable<string>() });
	export const title = "user posts";
	export const description = "Outputs all posts from a provided user";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	export let data = newData();
	let { handle } = data;
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
		class="w-36 pl-7"
		type="text"
		label="User handle"
		placeholder="user.bsky.social"
		hideLabel
		bind:value={$handle}
	>
		<span slot="before">@</span>
	</Input>
</BaseNode>
