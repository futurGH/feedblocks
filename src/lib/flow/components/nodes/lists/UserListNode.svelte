<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.List,
			name: "output",
			type: "list",
			description: "The user list at the provided URL",
		},
	];
	export const newData = () => ({ uri: writable<string>() });
	export const title = "user list";
	export const description = "Outputs the user list at the provided URL";
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
	color="emerald"
	showHandleNames={false}
	{inputs}
	{outputs}
	{...$$props}
>
	<Input
		slot="additional"
		id={`${id}-input`}
		class="w-36"
		type="text"
		label="User list"
		placeholder="list url"
		hideLabel
		bind:value={$uri}
	/>
</BaseNode>
