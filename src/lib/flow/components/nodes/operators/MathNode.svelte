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
			description: "The number result of the equation",
		},
	];
	export const newData = () => ({
		inputs: writable<Array<InputOutput>>(inputs.slice(0, -1)),
		equation: writable<string>(),
		outputType: () => "number",
	});
	export const title = "math";
	export const description = `Outputs the result of the specified equation<br>Supported operations: +, -, *, /, ^, ()`;
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
		class="w-44 font-mono"
		type="text"
		label="Equation"
		placeholder="math equation"
		hideLabel
		bind:value={$equation}
	/>
	<InputCountControls slot="controls" bind:inputs={_inputs} />
</BaseNode>
