<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "period",
			description: "The period of time between the two dates entered",
		},
	];
	export const newData = () => ({
		quantity: writable<number>(0),
		unit: writable<string>("seconds"),
	});
	export const title = "period";
	export const description = "Outputs the period of time between two provided dates";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";
	import Select from "$lib/components/elements/Select.svelte";
	import { writable, type Writable } from "svelte/store";
	import type { SelectOption } from "@melt-ui/svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	export let data = newData();
	let { quantity, unit } = data;

	const units = [
		{ value: "seconds", label: "seconds" },
		{ value: "minutes", label: "minutes" },
		{ value: "hours", label: "hours" },
		{ value: "days", label: "days" },
		{ value: "weeks", label: "weeks" },
		{ value: "months", label: "months" },
		{ value: "years", label: "years" },
	];

	let quantityValue: string;
	let unitValue: Writable<SelectOption<string>> = writable(units[0]);

	$: quantity.set(Number(quantityValue || 0));
	$: unit.set($unitValue.value);
</script>

<BaseNode {title} {description} color="sky" showHandleNames={false} {inputs} {outputs} {...$$props}>
	<div slot="additional" class="flex flex-row gap-x-2">
		<Input
			id={`${id}-number`}
			class="w-12 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			type="number"
			label="Number"
			hideLabel
			bind:value={quantityValue}
		/>
		<Select options={units} label="Unit" selected={unitValue} width="w-24" hideLabel inFlow />
	</div>
</BaseNode>
