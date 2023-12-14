<script lang="ts">
	import {
		SvelteFlow,
		Background,
		BackgroundVariant,
		type Node,
		type Edge,
		ConnectionLineType,
		useSvelteFlow,
		Panel,
		type OnConnectStartParams,
		type IsValidConnection,
	} from "@xyflow/svelte";
	import "@xyflow/svelte/dist/style.css";
	import Sidebar from "$lib/flow/components/Sidebar.svelte";
	import { writable } from "svelte/store";
	import { allNodes, nodeCategories, nodeTypeToCategory } from "$lib/flow/components/nodes";
	import { type ComponentType, onMount } from "svelte";
	import { createId } from "@paralleldrive/cuid2";
	import ClipboardProvider from "$lib/flow/ClipboardProvider.svelte";
	import HistoryProvider from "$lib/flow/HistoryProvider.svelte";

	// This is ugly but it's a one-time thing so hopefully not too bad?
	const nodeTypes = Object.entries(allNodes).reduce<Record<string, ComponentType>>(
		(acc, [id, node]) => ({
			...acc,
			[id]: node.default,
		}),
		{}
	);

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
			selectable: false,
			deletable: false,
			position: { x: 200, y: 0 },
			data: {},
		},
	]);
	const edges = writable<Array<Edge>>([]);

	const { screenToFlowPosition } = useSvelteFlow();

	function onDragOver(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
	}

	function onDrop(event: DragEvent) {
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
			data: (type in allNodes && allNodes[type as never]?.newData?.()) || {},
		});
		$nodes = $nodes;
	}

	onMount(async () => await import("dragdroptouch-bug-fixed"));

	// When a user starts dragging a connection from a node, we want to get the colour that corresponds to that node's
	// category, then temporarily set the connectionline-stroke CSS variable to that colour
	function onConnectStart(_: unknown, { nodeId }: OnConnectStartParams) {
		if (!nodeId) return;
		const flow = document.querySelector<HTMLDivElement>(".svelte-flow");
		if (!flow) return;
		const nodeType = $nodes.find((node) => node.id === nodeId)?.type;
		if (!nodeType) return;
		const nodeColor = nodeCategories[nodeTypeToCategory[nodeType] || ""]?.color;
		if (!nodeColor) return;
		flow.style.setProperty("--xy-connectionline-stroke", `var(--edge-${nodeColor})`);
	}

	// Once a user lets go of the connection line, the connectionline-stroke variable should be reset
	// This variable doesn't apply to the connection line once it's been created; it becomes an edge
	function onConnectEnd() {
		const flow = document.querySelector<HTMLDivElement>(".svelte-flow");
		flow?.style.removeProperty("--xy-connectionline-stroke");
	}

	// Arrow function because the parameter type EdgeBase isn't exported
	// Boolean return value indicates whether the connection should be allowed
	// We return false if the target handle already has a connection
	const isValidConnection: IsValidConnection = (connection) => {
		return !$edges.some(
			(edge) =>
				edge.target === connection.target && edge.targetHandle === connection.targetHandle
		);
	};
</script>

<main class="h-screen w-screen">
	<HistoryProvider>
		<ClipboardProvider>
			<Sidebar />
			<SvelteFlow
				{nodeTypes}
				{nodes}
				{edges}
				fitView
				connectionLineType={ConnectionLineType.SmoothStep}
				defaultEdgeOptions={{ type: "smoothstep" }}
				proOptions={{ hideAttribution: true }}
				on:dragover={onDragOver}
				on:drop={onDrop}
				onconnectstart={onConnectStart}
				onconnectend={onConnectEnd}
				{isValidConnection}
			>
				<Background variant={BackgroundVariant.Dots} />
				<Panel position="top-right">
					<button
						class="rounded-md bg-white px-4 py-2 text-black shadow-md"
						on:click={() => console.log($nodes, $edges)}
					>
						Log nodes
					</button>
				</Panel>
			</SvelteFlow>
		</ClipboardProvider>
	</HistoryProvider>
</main>
