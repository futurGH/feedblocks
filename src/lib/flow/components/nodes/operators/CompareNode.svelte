<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "a",
			type: "any",
			description: "The first value to compare",
		},
		{
			connectorType: ConnectorType.Data,
			name: "b",
			type: "any",
			description: "The second value to compare",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			type: "boolean",
			description: "Whether the two inputs meet the specified condition",
		},
	];
	export const newData = () => ({ comparator: writable<string>() });
	export const title = "compare";
	export const description = "Output whether the two inputs meet the specified condition";
</script>

<script lang="ts">
	import {
		type Connection,
		type NodeProps,
		useHandleConnections,
		useNodes,
	} from "@xyflow/svelte";
	import { writable, type Writable } from "svelte/store";
	import type { SelectOption } from "@melt-ui/svelte";
	import Select from "$lib/components/elements/Select.svelte";
	import { makeHandleId, parseHandleId, typesMatch } from "$lib/util";
	import { allNodes } from "$lib/flow/components/nodes/index";
	import type { InputOutput } from "$lib/flow/types";

	type $$Props = NodeProps;

	export let data = newData();
	let { comparator } = data;

	const comparators = [
		{ label: "a > b", value: ">" },
		{ label: "a < b", value: "<" },
		{ label: "a = b", value: "=" },
		{ label: "a ≥ b", value: ">=" },
		{ label: "a ≤ b", value: "<=" },
	];

	let selected: Writable<SelectOption<string>> = writable(comparators[0]);
	$: comparator.set($selected.value);

	const nodes = useNodes();

	const aHandle = makeHandleId({ title, id: $$props.id, name: "a" }),
		bHandle = makeHandleId({ title, id: $$props.id, name: "b" });

	const aConnections = useHandleConnections({ nodeId: $$props.id, type: "target", id: aHandle }),
		bConnections = useHandleConnections({ nodeId: $$props.id, type: "target", id: bHandle });

	let aType: string | undefined, bType: string | undefined;

	aConnections.subscribe((conns) => {
		if (!conns.length) aType = undefined;
		conns.forEach((conn) => handleConnectionChange("a", conn));
	});
	bConnections.subscribe((conns) => {
		if (!conns.length) bType = undefined;
		conns.forEach((conn) => handleConnectionChange("b", conn));
	});

	let inputTypesInequal: boolean;
	$: inputTypesInequal = !!aType && !!bType && !typesMatch(aType, bType);

	// Whenever there's a new connection, we store the source handle's output type in the relevant variable
	// This is ueed to display an error message if the types don't match
	function handleConnectionChange(handle: "a" | "b", connection: Connection) {
		const sourceNode = $nodes.find((node) => node.id === connection.source);
		if (!sourceNode?.type) return;
		const { name: sourceHandleName } = parseHandleId(connection.sourceHandle) ?? {};
		const sourceType = allNodes[sourceNode.type as never]?.outputs.find(
			(output: InputOutput) => output.name === sourceHandleName
		)?.type;
		if (!sourceType) return;
		if (handle === "a") aType = sourceType;
		else bType = sourceType;
	}
</script>

<BaseNode
	{title}
	{description}
	color="rose"
	{inputs}
	{outputs}
	error={inputTypesInequal}
	{...$$props}
>
	<Select
		slot="additional"
		bind:selected
		options={comparators}
		label="Select a comparison method"
		hideLabel
		inFlow
	/>
	<span slot="error"
		>can't compare <span class="rounded-full bg-red-100 px-1 py-0.5 dark:bg-red-900"
			>{aType}</span
		>
		and
		<span class="rounded-full bg-red-100 px-1 py-0.5 dark:bg-red-900">{bType}</span>
	</span>
</BaseNode>
