<script context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "posts",
			description: "Posts that contain any of the provided hashtags",
		},
	];
	export const title = "hashtag posts";
	export const description = "Outputs all posts containing any of the provided hashtags";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import Input from "$lib/components/elements/Input.svelte";
	import InputCountControls from "$lib/flow/components/InputCountControls.svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	let items: Array<string> = [""];
</script>

<BaseNode
	{title}
	{description}
	color="slate"
	showHandleNames={false}
	{inputs}
	{outputs}
	{...$$props}
	on:connect
	on:connectstart
	on:connectend
>
	<div slot="additional" class="flex flex-col items-center gap-y-3">
		{#each items as _, i (i)}
			<Input
				id={`${id}-${i}-input`}
				class="w-36 pl-6"
				type="text"
				label={`Text field ${i}`}
				placeholder="hashtag"
				hideLabel
				bind:value={items[i]}
			>
				<span slot="before">#</span>
			</Input>
		{/each}
	</div>
	<InputCountControls slot="controls" min={1} bind:inputs={items} newInput={() => ""} />
</BaseNode>
