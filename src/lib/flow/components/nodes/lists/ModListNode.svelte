<script context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.List,
			name: "output",
			type: "list",
		},
	];
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";
	import { writable, type Writable } from "svelte/store";

	type $$Props = NodeProps;

	export let id: $$Props["id"];
	let uri: Writable<string> = writable();
</script>

<BaseNode
	title="mod list"
	color="emerald"
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
		label="Moderation list"
		placeholder="list url"
		hideLabel
		bind:value={uri}
	/>
</BaseNode>
