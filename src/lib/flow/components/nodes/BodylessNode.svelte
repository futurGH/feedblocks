<script lang="ts">
	import { cn, makeHandleId } from "$lib/util";
	import { getEdgeColor, getHandleShape } from "$lib/flow/components/nodes/BaseNode.svelte";
	import WrappedHandle from "$lib/flow/components/WrappedHandle.svelte";
	import {
		Position,
		type NodeProps,
		type Node,
		type Edge,
		useNodes,
		useEdges,
	} from "@xyflow/svelte";
	import type { InputOutput } from "$lib/flow/types";
	import { type Writable, writable } from "svelte/store";

	type $$Props = NodeProps & {
		title: string;
		description: string;
		color: string;
		handleType: "source" | "target";
		handle: InputOutput;
		inFlow?: boolean;
	};

	export let id: $$Props["id"];

	export let title: string;
	export let description: string;
	export let color: string;
	export let handleType: $$Props["handleType"];
	export let handle: $$Props["handle"];

	export let inFlow = true;

	let nodes: Writable<Array<Node>>;
	let edges: Writable<Array<Edge>>;
	try {
		nodes = useNodes();
		edges = useEdges();
	} catch (e) {
		// We're being rendered outside of a flow
		nodes = writable<Array<Node>>([]);
		edges = writable<Array<Edge>>([]);
		inFlow = false;
	}

	const handleId = makeHandleId({ title, id, name: handle.name });
	let isConnectable = true;
	let edgeTargetHandleToEdgeColor: Record<string, string> = {};

	if (handleType === "target") {
		edges.subscribe((edges) => {
			// Start with the assumption that all handles can be connected to
			isConnectable = true;
			edgeTargetHandleToEdgeColor = {};

			for (const edge of edges) {
				if (edge.target !== id || !edge.targetHandle) continue;

				// If an edge exists whose target is a handle owned by this node, it should no longer be connectable
				if (isConnectable) isConnectable = false;

				const edgeColor = getEdgeColor(edge, $nodes);
				if (edgeColor) {
					edgeTargetHandleToEdgeColor[edge.targetHandle] = edgeColor;
					edge.style = `--edge-stroke: var(--edge-${edgeColor});`;
				}
			}
		});
	}
</script>

<div
	class={cn(
		"relative flex flex-col items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 py-2.5 dark:border-zinc-700 dark:bg-zinc-900",
		`bg-header-${color}`,
		inFlow ? "w-52" : "w-full"
	)}
>
	<span class="font-semibold text-zinc-900/75 text-title dark:text-zinc-50/75">{title}</span>
	<WrappedHandle
		id={handleId}
		type={handleType}
		class={cn(
			"mt-0.5 !border-none",
			getHandleShape(handle.connectorType),
			handleType === "source" && `!bg-${color}-edge`,
			handleType === "target" &&
				edgeTargetHandleToEdgeColor[handleId] &&
				`!bg-${edgeTargetHandleToEdgeColor[handleId]}-edge`
		)}
		position={handleType === "source" ? Position.Right : Position.Left}
		{isConnectable}
		on:connect
		on:connectstart
		on:connectend
	/>
</div>
