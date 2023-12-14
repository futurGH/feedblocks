<script lang="ts" context="module">
	import { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			type: "posts",
			description: "The posts that this feed should output",
		},
	];
	export const outputs = [];
	export const title = "feed output";
	export const description = "The output of this feed";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import BaseNode from "$lib/flow/components/nodes/BaseNode.svelte";

	type $$Props = NodeProps;

	let selected = false;

	const onClick = (e: MouseEvent) => {
		if (
			// type narrowing
			e.target instanceof HTMLElement &&
			// don't select/deselect if a node action button was clicked
			!e.target.closest("[data-node-actions]")
		)
			selected = !selected;
		e.stopImmediatePropagation();
	};
</script>

<svelte:window on:click={() => (selected = false)} />
<BaseNode
	{title}
	{description}
	color="slate"
	{inputs}
	{outputs}
	copyable={false}
	deletable={false}
	hasBody={false}
	{...$$props}
	{selected}
	on:click={onClick}
/>
