<script context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "posts",
			description: "Posts from all users on the provided list",
		},
	];
	export const title = "user list posts";
	export const description = "Outputs posts from all users on a provided list";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];
	let uri: string;
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
		label="User list"
		placeholder="list url"
		hideLabel
		bind:value={uri}
	/>
</BaseNode>
