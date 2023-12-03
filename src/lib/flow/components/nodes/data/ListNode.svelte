<script context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "array",
		},
	];
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";
	import InputCountControls from "$lib/flow/components/InputCountControls.svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	let items: Array<string> = ["", ""];
</script>

<BaseNode
	title="list"
	color="sky"
	showHandleNames={false}
	{inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<div slot="additional" class="flex flex-col items-center gap-y-3">
		{#each items as _, i (i)}
			<Input
				id={`${id}-${i}-input`}
				class="w-36"
				type="text"
				label={`Text field ${i}`}
				hideLabel
				bind:value={items[i]}
			/>
		{/each}
	</div>
	<InputCountControls slot="controls" bind:inputs={items} newInput={() => ""} />
</BaseNode>
