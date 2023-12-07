<script lang="ts">
	import {
		SvelteFlow,
		Background,
		BackgroundVariant,
		type Node,
		type Edge,
		ConnectionLineType,
		useSvelteFlow,
	} from "@xyflow/svelte";
	import "@xyflow/svelte/dist/style.css";
	import Sidebar from "$lib/flow/components/Sidebar.svelte";
	import { writable } from "svelte/store";
	import { nodeCategories } from "$lib/flow/components/nodes";
	import { type ComponentType, onMount } from "svelte";
	import { createId } from "@paralleldrive/cuid2";

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
			id: "firehose",
			type: "allPosts",
			position: { x: -200, y: 0 },
			data: {},
		},
		{
			id: "output",
			type: "feedOutput",
			deletable: false,
			position: { x: 200, y: 0 },
			data: {},
		},
	]);
	const edges = writable<Array<Edge>>([]);

	const { screenToFlowPosition } = useSvelteFlow();

	const onDragOver = (event: DragEvent) => {
		event.preventDefault();
		if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
	};

	const onDrop = (event: DragEvent) => {
		event.preventDefault();
		if (!event.dataTransfer) return;

		const type = event.dataTransfer.getData("application/svelteflow");
		const position = screenToFlowPosition({
			x: event.clientX,
			y: event.clientY,
		});

		$nodes.push({
			id: createId(),
			type,
			position,
			origin: [0.5, 0],
			data: {},
		});
		$nodes = $nodes;
	};

	onMount(async () => await import("dragdroptouch-bug-fixed"));
</script>

<main class="h-screen w-screen">
	<Sidebar />
	<SvelteFlow
		{nodeTypes}
		{nodes}
		{edges}
		fitView
		connectionLineType={ConnectionLineType.SmoothStep}
		defaultEdgeOptions={{ type: "smoothstep" }}
		deleteKey="Delete"
		proOptions={{ hideAttribution: true }}
		on:dragover={onDragOver}
		on:drop={onDrop}
	>
		<Background variant={BackgroundVariant.Dots} />
	</SvelteFlow>
</main>
