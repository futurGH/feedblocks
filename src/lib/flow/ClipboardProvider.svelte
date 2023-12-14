<script lang="ts">
	import { writable } from "svelte/store";
	import {
		useStore,
		useSvelteFlow,
		type Node,
		type Edge,
		useNodes,
		useEdges,
		getConnectedEdges,
	} from "@xyflow/svelte";
	import { onMount } from "svelte";
	import { createId } from "@paralleldrive/cuid2";
	import { shortcut } from "@svelte-put/shortcut";

	const mousePosition = writable({ x: 0, y: 0 });
	const nodeBuffer = writable<Array<Node>>([]);
	const edgeBuffer = writable<Array<Edge>>([]);

	const { domNode } = useStore();
	const { screenToFlowPosition } = useSvelteFlow();

	const nodes = useNodes();
	const edges = useEdges();

	onMount(() => {
		const events = ["copy", "cut", "paste"];
		const preventDefault = (e: Event) => {
			e.preventDefault();
		};

		if (!$domNode) return;

		for (const event of events) {
			$domNode.addEventListener(event, preventDefault);
		}

		return () => {
			for (const event of events) {
				$domNode?.removeEventListener(event, preventDefault);
			}
		};
	});

	const onMouseMove = (e: MouseEvent) => {
		mousePosition.set({ x: e.clientX, y: e.clientY });
	};

	function copy() {
		const selectedNodes = $nodes.filter((node) => node.selected);
		const selectedEdges = getConnectedEdges(selectedNodes, $edges).filter((edge) => {
			const sourceOutsideSelection = selectedNodes.every((n) => n.id !== edge.source);
			const targetOutsideSelection = selectedNodes.every((n) => n.id !== edge.target);

			return !sourceOutsideSelection && !targetOutsideSelection;
		});

		nodeBuffer.set(selectedNodes);
		edgeBuffer.set(selectedEdges);
		return { selectedNodes, selectedEdges };
	}

	function cut() {
		const { selectedEdges } = copy();
		nodes.update((nodes) => nodes.filter((node) => !node.selected));
		edges.update((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
	}

	function paste(position?: { x: number; y: number }) {
		const { x: pasteX, y: pasteY } = screenToFlowPosition(position || $mousePosition);

		const minX = Math.min(...$nodeBuffer.map((node) => node.position.x));
		const minY = Math.min(...$nodeBuffer.map((node) => node.position.y));

		// This is necessary because each new edge needs to know what new node IDs to connect to
		const nodeIdMapping = $nodeBuffer.reduce<Record<string, string>>((acc, node) => {
			acc[node.id] = createId();
			return acc;
		}, {});

		const newNodes = $nodeBuffer.map((node) => ({
			...node,
			id: nodeIdMapping[node.id],
			position: {
				x: pasteX + (node.position.x - minX),
				y: pasteY + (node.position.y - minY),
			},
		}));

		const newEdges = $edgeBuffer.map((edge) => {
			const [sourceNodeType, sourceNodeId, sourceHandleId] =
				edge.sourceHandle?.split("-") ?? [];
			const [targetNodeType, targetNodeId, targetHandleId] =
				edge.targetHandle?.split("-") ?? [];
			const newSourceNodeId = nodeIdMapping[sourceNodeId];
			const newTargetNodeId = nodeIdMapping[targetNodeId];
			const sourceHandle = sourceHandleId
				? `${sourceNodeType}-${newSourceNodeId}-${sourceHandleId}`
				: null;
			const targetHandle = targetHandleId
				? `${targetNodeType}-${newTargetNodeId}-${targetHandleId}`
				: null;
			return {
				...edge,
				id: createId(),
				source: newSourceNodeId,
				target: newTargetNodeId,
				sourceHandle,
				targetHandle,
			};
		});
		console.log(newEdges);

		nodes.update((nodes) => [
			...nodes.map((node) => ({ ...node, selected: false })),
			...newNodes,
		]);
		edges.update((edges) => [...edges, ...newEdges]);
	}
</script>

<svelte:window
	on:mousemove={onMouseMove}
	use:shortcut={{
		trigger: [
			{ key: "c", modifier: ["ctrl", "meta"], callback: () => copy() },
			{ key: "x", modifier: ["ctrl", "meta"], callback: () => cut() },
			{ key: "v", modifier: ["ctrl", "meta"], callback: () => paste() },
		],
	}}
/>
<slot />
