<script lang="ts">
	import {
		SvelteFlow,
		Controls,
		Background,
		BackgroundVariant,
		MiniMap,
		type Node,
		type Edge,
		ConnectionLineType,
	} from "@xyflow/svelte";
	import "@xyflow/svelte/dist/style.css";
	import { writable } from "svelte/store";
	import { nodeCategories } from "$lib/flow/components/nodes";
	import type { ComponentType } from "svelte";

	// This is ugly but it's a one-time thing so hopefully not too bad?
	const nodeTypes = Object.values(nodeCategories).reduce((acc, category) => {
		Object.assign(
			acc,
			Object.entries(category.nodes).reduce<Record<string, ComponentType>>(
				(acc, [id, node]) => {
					acc[id] = node.default;
					return acc;
				},
				{}
			)
		);
		return acc;
	}, {});

	const nodes = writable<Array<Node>>([
		{
			id: "1",
			type: "multiply",
			position: { x: 0, y: 300 },
			data: {},
		},
		{
			id: "2",
			type: "multiply",
			position: { x: 350, y: 300 },
			data: {},
		},
		{
			id: "3",
			type: "multiply",
			position: { x: -400, y: 200 },
			data: {},
		},
		{
			id: "4",
			type: "sort",
			position: { x: 0, y: 500 },
			data: {},
		},
		{
			id: "5",
			type: "sort",
			position: { x: 0, y: 0 },
			data: {},
		},
	]);
	const edges = writable<Array<Edge>>([]);
</script>

<SvelteFlow
	{nodeTypes}
	{nodes}
	{edges}
	fitView
	connectionLineType={ConnectionLineType.SmoothStep}
	defaultEdgeOptions={{ type: "smoothstep" }}
	proOptions={{ hideAttribution: true }}
>
	<Controls />
	<Background variant={BackgroundVariant.Dots} />
	<MiniMap />
</SvelteFlow>
