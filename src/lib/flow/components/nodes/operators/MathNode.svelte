<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	import type { InputOutput } from "$lib/flow/types";

	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "number",
			description: "The first number input",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "number",
			description: "The second number input",
		},
		{
			connectorType: ConnectorType.Data,
			name: "...rest",
			type: "number",
			description: "Any additional number inputs",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "number",
			description: "The result of the specified equation",
		},
	];
	export const newData = () => ({
		inputs: writable<Array<InputOutput>>(inputs.slice(0, -1)),
		equation: writable<string>(),
	});
	export const title = "math";
	export const description = "Outputs the result of the specified equation with the given inputs";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import InputCountControls from "$lib/flow/components/InputCountControls.svelte";
	import Input from "$lib/components/elements/Input.svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	export let data = newData();
	let { inputs: _inputs, equation } = data;
</script>

<BaseNode {title} {description} color="rose" inputs={$_inputs} {outputs} {...$$props}>
	<Input
		slot="additional"
		id={`${id}-input`}
		class="font-mono w-44"
		type="text"
		label="Equation"
		placeholder="math equation"
		hideLabel
		bind:value={$equation}
	/>
	<InputCountControls slot="controls" bind:inputs={_inputs} />
</BaseNode>
