<script context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "text",
			type: "string",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			type: "boolean",
		},
	];
	export const title = "match regex";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";
	import Switch from "$lib/components/elements/Switch.svelte";
	import { writable, type Writable } from "svelte/store";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	let text: string;
	let caseSensitive: Writable<boolean> = writable(false);
</script>

<BaseNode
	{title}
	color="indigo"
	{inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<svelte:fragment slot="additional">
		<Input
			id={`${id}-input`}
			class="w-36 px-6"
			type="text"
			label="Text"
			hideLabel
			bind:value={text}
		>
			<span slot="before">/</span>
			<span slot="after">/</span>
		</Input>
		<Switch
			id={`${id}-switch`}
			label="case sensitive"
			bind:checked={caseSensitive}
			class="data-[state=checked]:bg-header-indigo"
		/>
	</svelte:fragment>
</BaseNode>
