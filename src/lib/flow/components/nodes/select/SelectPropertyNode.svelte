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
			type: "any",
			description: "The value of the selected property",
		},
	];
	export const newData = () => ({
		path: writable<string>(),
	});
	export const title = "select property";
	export const description = "Selects a property from an item";
</script>

<script lang="ts">
	import { type NodeProps, useHandleConnections, useNodes } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";
	import { types } from "$lib/conversion/types";
	import { makeHandleId, parseHandleId } from "$lib/util";
	import { allNodes } from "$lib/flow/components/nodes/index";
	import type { InputOutput } from "$lib/flow/types";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	export let data = newData();
	let { path } = data;

	const nodes = useNodes();

	let inputType: string | undefined;
	const inputConnections = useHandleConnections({
		nodeId: id,
		type: "target",
		id: makeHandleId({ title, id, name: "item" }),
	});
	inputConnections.subscribe((connections) => {
		for (const connection of connections) {
			const sourceNode = $nodes.find((node) => node.id === connection.source);
			if (!sourceNode?.type) return;
			const { name: sourceHandleName } = parseHandleId(connection.sourceHandle) ?? {};
			const sourceType = allNodes[sourceNode.type as keyof typeof allNodes]?.outputs.find(
				(output: InputOutput) => output.name === sourceHandleName
			)?.type;
			if (!sourceType) return;
			inputType = sourceType;
		}
	});

	$: pathFragments = $path?.split(".") ?? [];
	$: currentKey = pathFragments[pathFragments.length - 1];

	function resolveFragments(fragments: string[]) {
		let result = types;
		for (let fragment of fragments) {
			if (!result) return null;
			result = result[fragment];
		}
		return result;
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
	<svelte:fragment slot="additional">
		<Input
			id={`${id}-input`}
			class="w-36"
			type="text"
			label="path"
			placeholder="path"
			hideLabel
			bind:value={$path}
		/>
	</svelte:fragment>
</BaseNode>
