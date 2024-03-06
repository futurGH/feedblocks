<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			description: "The list entered",
		},
	];
	export const newData = () => ({
		items: writable<Array<string>>(["", ""]),
		outputType: () => "string[]",
	});
	export const title = "list";
	export const description = "Outputs a provided list of strings";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";
	import InputCountControls from "$lib/flow/components/InputCountControls.svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	export let data = newData();
	let { items } = data;
</script>

<BaseNode {title} {description} color="sky" showHandleNames={false} {inputs} {outputs} {...$$props}>
	<div slot="additional" class="flex flex-col items-center gap-y-3">
		{#each $items as _, i (i)}
			<Input
				id={`${id}-${i}-input`}
				class="w-36"
				type="text"
				label={`Text field ${i}`}
				hideLabel
				bind:value={$items[i]}
			/>
		{/each}
	</div>
	<InputCountControls slot="controls" min={2} max={10} bind:inputs={items} newInput={() => ""} />
</BaseNode>
