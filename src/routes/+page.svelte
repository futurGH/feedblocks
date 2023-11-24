<script lang="ts">
	import { SvelteFlow, Controls, Background, BackgroundVariant, MiniMap } from "@xyflow/svelte";
	import "@xyflow/svelte/dist/style.css";
	import { writable } from "svelte/store";

	import { utilityNodes } from "$lib/flow/components/nodes/utilities";

	const nodeTypes = {
		...utilityNodes,
	};

	const nodes = writable([
		{
			id: "test",
			type: "multiply",
			position: { x: 0, y: 0 },
			data: {},
		},
	]);

	const edges = writable([]);
</script>

<!--
👇 By default, the Svelte Flow container has a height of 100%.
This means that the parent container needs a height to render the flow.
-->
<SvelteFlow {nodeTypes} {nodes} {edges} fitView proOptions={{ hideAttribution: true }}>
	<Controls />
	<Background variant={BackgroundVariant.Dots} />
	<MiniMap />
</SvelteFlow>
