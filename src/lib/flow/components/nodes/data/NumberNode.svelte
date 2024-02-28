<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			description: "The number entered",
		},
	];
	export const newData = () => ({ number: writable<number>(0), outputType: () => "number" });
	export const title = "number";
	export const description = "Outputs a provided number";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	export let data = newData();
	let { number } = data;

	let value: string;
	$: number.set(Number(value || 0));
</script>

<BaseNode {title} {description} color="sky" showHandleNames={false} {inputs} {outputs} {...$$props}>
	<Input
		slot="additional"
		id={`${id}-input`}
		class="w-36 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
		type="number"
		label="Number"
		hideLabel
		bind:value
	/>
</BaseNode>
