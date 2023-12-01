<script context="module" lang="ts">
	import type { Node, Edge } from "@xyflow/svelte";
	import { nodeCategories, nodeTypeToCategory } from "$lib/flow/components/nodes";

	export const ConnectorType = {
		Data: "data",
		List: "list",
		Condition: "condition",
	};

	export type ConnectorType = (typeof ConnectorType)[keyof typeof ConnectorType];

	// Returns the colour an edge should be based on the colour of its source node
	export function getEdgeColor(edge: Edge<unknown>, nodes: Array<Node>) {
		if (!edge.sourceHandle || !edge.source) return null;
		const source = nodes.find((node) => node.id === edge.source);
		if (!source?.type) return null;
		const sourceNodeCategory = nodeTypeToCategory[source.type];
		if (!sourceNodeCategory) return null;
		return nodeCategories[sourceNodeCategory]?.color || null;
	}
</script>

<script lang="ts">
	import { cn } from "$lib/util";
	import { Position, Handle, type NodeProps, useNodes, useEdges } from "@xyflow/svelte";

	type $$Props = NodeProps & {
		title: string;
		color: string;
		inputs: Array<{ name: string; connectorType: ConnectorType }>;
		outputs: Array<{ name: string; connectorType: ConnectorType }>;
	};
	type $$Slots = {
		default: never;
		additional: {};
	};

	export let id: $$Props["id"];

	export let title: string;
	export let color: string;

	export let inputs: Array<{ name: string; connectorType: ConnectorType }> = [];
	export let outputs: Array<{ name: string; connectorType: ConnectorType }> = [];
	$: hasConnectors = inputs.length > 0 || outputs.length > 0;

	const nodes = useNodes();
	const edges = useEdges();

	let isHandleConnectable: Record<string, boolean> = {};
	let edgeTargetHandleToEdgeColor: Record<string, string> = {};

	edges.subscribe((edges) => {
		// Start with the assumption that all handles can be connected to
		isHandleConnectable = inputs.reduce<Record<string, boolean>>((acc, { name }) => {
			acc[`${title}-${id}-${name}`] = true;
			return acc;
		}, {});
		edgeTargetHandleToEdgeColor = {};

		for (const edge of edges) {
			if (edge.target !== id || !edge.targetHandle) continue;

			// If an edge exists whose target is a handle owned by this node, it should no longer be connectable
			if (isHandleConnectable[edge.targetHandle]) {
				isHandleConnectable[edge.targetHandle] = false;
			}

			const edgeColor = getEdgeColor(edge, $nodes);
			if (edgeColor) {
				edgeTargetHandleToEdgeColor[edge.targetHandle] = edgeColor;
				edge.style = `--edge-stroke: var(--edge-${edgeColor})`;
			}
		}
	});

	function getHandleShape(connectorType: ConnectorType) {
		switch (connectorType) {
			case ConnectorType.List:
				return "square-handle";
			case ConnectorType.Condition:
				return "diamond-handle";
			case ConnectorType.Data:
			default:
				return "circle-handle";
		}
	}
</script>

<div
	class="flex w-52 flex-col rounded-2xl border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
>
	<div
		class={cn(
			"flex w-full items-center justify-center rounded-t-2xl border-b border-b-zinc-300 py-2.5 dark:border-b-zinc-700",
			`bg-header-${color}`
		)}
	>
		<span class="font-semibold text-zinc-900/75 text-title">{title}</span>
	</div>
	<div class={cn("flex flex-col", hasConnectors ? "py-2" : "py-3")}>
		{#if hasConnectors}
			<div class="flex justify-between self-stretch py-2">
				<div class="flex min-w-fit max-w-full flex-col gap-y-4">
					{#each inputs as { name, connectorType }}
						{@const handleId = `${title}-${id}-${name}`}
						<div class="relative pl-4">
							<Handle
								id={handleId}
								type="target"
								class={cn(
									`mt-0.5 !border-none`,
									getHandleShape(connectorType),
									edgeTargetHandleToEdgeColor[handleId] &&
										`!bg-${edgeTargetHandleToEdgeColor[handleId]}-edge`
								)}
								position={Position.Left}
								isConnectable={isHandleConnectable[handleId]}
								on:connect
								on:connectstart
								on:connectend
							/>
							<span
								class="font-medium text-zinc-900/75 font-sans text-label capsize dark:text-zinc-100/80"
								>{name}</span
							>
						</div>
					{/each}
				</div>
				<div class="flex min-w-fit max-w-full flex-col gap-y-4">
					{#each outputs as { name, connectorType }}
						{@const handleId = `${title}-${id}-${name}`}
						<div class="relative pr-4">
							<span
								class="flex-grow text-right font-medium text-zinc-900/75 font-sans text-label capsize dark:text-zinc-100/80"
								>{name}</span
							>
							<Handle
								id={handleId}
								type="source"
								class={cn(
									`mt-0.5 !bg-${color}-edge !border-none`,
									getHandleShape(connectorType)
								)}
								position={Position.Right}
								on:connect
								on:connectstart
								on:connectend
							/>
						</div>
					{/each}
				</div>
			</div>
		{/if}
		{#if $$slots.additional}
			<div class="flex flex-col items-center justify-center gap-4 py-2">
				<slot name="additional" />
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	:global(.svelte-flow .svelte-flow__handle.circle-handle) {
		@apply h-3 w-3 rounded-full;
	}
	:global(.svelte-flow .svelte-flow__handle.square-handle) {
		@apply h-2.5 w-2.5 rounded-none;
	}
	:global(.svelte-flow .svelte-flow__handle.diamond-handle) {
		@apply h-2.5 w-2.5 origin-center -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-none;
	}
</style>
