<script context="module">
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

	const units = ["seconds", "minutes", "hours", "days", "weeks", "months", "years"];

	let quantity: string;
	let unit: Writable<SelectOption<string>> = writable({ value: units[0] });
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
	<div slot="additional" class="flex flex-row gap-x-2">
		<Input
			id={`${id}-number`}
			class="w-12 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			type="number"
			label="Number"
			hideLabel
			bind:value={quantity}
		/>
		<Select options={units} label="Unit" selected={unit} width="w-24" hideLabel inFlow />
	</div>
</BaseNode>
