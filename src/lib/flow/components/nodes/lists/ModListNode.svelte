<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.List,
			name: "output",
			description: "The mod list at the specified URL",
		},
	];
	export const newData = () => ({ uri: writable<string>(), outputType: () => "user[]" });
	export const title = "mod list";
	export const description = "Outputs the moderation list at the specified URL";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";
	import { writable, type Writable } from "svelte/store";

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
		label="Moderation list"
		placeholder="list url"
		hideLabel
		bind:value={$uri}
	/>
</BaseNode>
