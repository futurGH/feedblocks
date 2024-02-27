<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "text",
			type: "string",
			description: "The text to match",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			type: "boolean",
			description: "Whether the text matches the regex",
		},
	];
	export const newData = () => ({
		regex: writable<string>(),
		caseSensitive: writable<boolean>(),
	});
	export const title = "match regex";
	export const description = "Outputs whether the provided text matches the specified regex";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";
	import Switch from "$lib/components/elements/Switch.svelte";
	import { writable, type Writable } from "svelte/store";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	export let data = newData();
	let { regex, caseSensitive } = data;
</script>

<BaseNode {title} {description} color="indigo" {inputs} {outputs} {...$$props}>
	<svelte:fragment slot="additional">
		<Input
			id={`${id}-input`}
			class="w-36 px-6 font-mono [font-variant-ligatures:none]"
			type="text"
			label="Text"
			hideLabel
			bind:value={$regex}
		>
			<span slot="before" class="font-mono">/</span>
			<span slot="after" class="font-mono">/</span>
		</Input>
		<Switch
			id={`${id}-switch`}
			label="case sensitive"
			bind:checked={caseSensitive}
			class="data-[state=checked]:bg-header-indigo"
		/>
	</svelte:fragment>
</BaseNode>
