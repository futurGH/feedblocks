<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "string",
			description: "The text value entered",
		},
	];
	export const newData = () => ({ text: writable<string>() });
	export const title = "text";
	export const description = "Outputs a provided text value";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];
	export let data = newData();

	let { text } = data;
</script>

<BaseNode
	{title}
	{description}
	color="sky"
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
		label="Text"
		hideLabel
		bind:value={$text}
	/>
</BaseNode>
