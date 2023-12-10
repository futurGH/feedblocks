<script lang="ts" context="module">
	import BodylessNode from "$lib/flow/components/nodes/BodylessNode.svelte";
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
<BodylessNode
	{title}
	{description}
	color="slate"
	handleType="target"
	handle={inputs[0]}
	copyable={false}
	deletable={false}
	{...$$props}
	{selected}
	on:click={onClick}
	on:connect
	on:connectstart
	on:connectend
/>
