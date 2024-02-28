<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "item",
			type: "any",
			description: "The object to select a property from",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			description: "The value of the selected property",
		},
	];
	export const newData = () => ({
		path: writable<string>(),
		outputType: () => "any",
	});
	export const title = "select property";
	export const description = "Selects a property from an item";
</script>

<script lang="ts">
	import { type NodeProps, useHandleConnections, useSvelteFlow } from "@xyflow/svelte";
	import { types } from "$lib/conversion/types";
	import { makeHandleId } from "$lib/util";
	import Combobox, { type ComboboxItem } from "$lib/components/elements/Combobox.svelte";
	import type { Writable } from "svelte/store";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	export let data = newData();
	let { path } = data;

	let selected: Writable<ComboboxItem> = writable();
	$: $path = $selected?.value;

	const { getNode } = useSvelteFlow();

	let inputType: string | undefined;
	const inputConnections = useHandleConnections({
		nodeId: id,
		type: "target",
		id: makeHandleId({ title, id, name: "item" }),
	});
	inputConnections.subscribe((connections) => {
		const sourceNode = getNode(connections[0]?.source);
		inputType = sourceNode?.data?.outputType?.();
	});

	path.subscribe((value) => {
		const outputType = resolvePath(value);
		if (outputType) data.outputType = () => outputType;
	});

	let propertyAutocompletion: Array<ComboboxItem> = [];
	$: if (inputType) {
		let typeObject = inputType.endsWith("[]")
			? types[inputType.slice(0, -2) as keyof typeof types]
			: types[inputType as keyof typeof types];
		if (typeObject)
			propertyAutocompletion = Object.keys(typeObject).map((key) => ({
				label: key,
				value: key,
			}));
		else propertyAutocompletion = [];
	}

	$: console.log(inputType, propertyAutocompletion);

	function resolvePath(path = $path) {
		if (!inputType) return;
		let currentType = inputType.endsWith("[]") ? inputType.slice(0, -2) : inputType;
		if (!(currentType in types)) return;
		let currentObject: Record<string, string> = types[currentType as keyof typeof types];

		console.log(currentType, currentObject);
		for (const part of path.split(".")) {
			if (!part) return null;

			if (currentType.endsWith("[]")) {
				if (isNaN(Number.parseInt(part, 10))) return null;
				currentType = currentType.slice(0, -2);
			} else {
				currentType = currentObject[part];
			}
			if (!currentType) return null;

			if (currentType in types) {
				currentObject = types[currentType as keyof typeof types];
			}
		}

		return currentType;
	}
</script>

<BaseNode
	{title}
	{description}
	color="amber"
	showHandleNames={false}
	{inputs}
	{outputs}
	{...$$props}
>
	<Combobox
		slot="additional"
		label="Enter a property path to select"
		placeholder="likers.0.handle"
		hideLabel
		inFlow
		bind:selected
		options={propertyAutocompletion}
	/>
</BaseNode>
