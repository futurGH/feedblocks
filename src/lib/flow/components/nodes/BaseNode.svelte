<script lang="ts" context="module">
	import type { Node, Edge } from "@xyflow/svelte";
	import { nodeCategories, nodeTypeToCategory } from "$lib/flow/components/nodes";
	import WrappedHandle from "$lib/flow/components/WrappedHandle.svelte";

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

	export function getHandleShape(connectorType: ConnectorType) {
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

<script lang="ts">
	import { cn } from "$lib/util";
	import { Position, type NodeProps, useNodes, useEdges } from "@xyflow/svelte";
	import { AlertCircleIcon } from "lucide-svelte";
	import type { InputOutput } from "$lib/flow/types";
	import { writable, type Writable } from "svelte/store";
	import { makeHandleId } from "$lib/util";
	import { createId } from "@paralleldrive/cuid2";

	type $$Props = Partial<NodeProps> & {
		title: string;
		description: string;
		color: string;
		inputs: Array<InputOutput>;
		outputs: Array<InputOutput>;
		showHandleNames?: boolean;
		inFlow?: boolean;
	};
	type $$Slots = {
		default: never;
		additional: {};
		error: {};
		controls: {};
	};

	export let id = createId();
	export let selected: $$Props["selected"] = undefined;

	export let title: string;
	export let description: string;
	export let color: string;

	export let showHandleNames = true;
	export let inFlow = true;

	export let inputs: Array<InputOutput> = [];
	export let outputs: Array<InputOutput> = [];
	$: hasConnectors = inputs.length > 0 || outputs.length > 0;

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

	let isHandleConnectable: Record<string, boolean> = {};
	let edgeTargetHandleToEdgeColor: Record<string, string> = {};

	edges.subscribe((edges) => {
		// Start with the assumption that all handles can be connected to
		isHandleConnectable = inputs.reduce<Record<string, boolean>>((acc, { name }) => {
			acc[makeHandleId({ title, id, name })] = true;
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
				edge.style = `--edge-stroke: var(--edge-${edgeColor});`;
			}
		}
	});
</script>

<div
	class={cn(
		"relative flex flex-col rounded-2xl bg-zinc-100 ring-1 ring-zinc-300 dark:bg-zinc-900 dark:ring-zinc-700",
		$$props.selected && "ring-2 ring-zinc-400 dark:ring-zinc-600",
		inFlow ? "w-52" : "w-full"
	)}
>
	{#if selected}
		<div
			class="absolute -top-2 left-1/2 flex h-6 -translate-x-1/2 -translate-y-full flex-row overflow-clip rounded-lg bg-zinc-100 ring-1 ring-zinc-300 dark:bg-zinc-900 dark:ring-zinc-700"
		>
			<button class="h-6 w-6">t</button>
			<button class="h-6 w-6 border-x border-x-zinc-300 dark:border-x-zinc-700">t</button>
			<button class="h-6 w-6">t</button>
		</div>
	{/if}
	<div
		class={cn(
			"flex w-full items-center justify-center rounded-t-2xl border-b border-b-zinc-300 py-2.5 dark:border-b-zinc-700",
			`bg-header-${color}`
		)}
	>
		<span class="font-semibold text-zinc-900/75 text-title dark:text-zinc-50/75">{title}</span>
	</div>
	<div
		class={cn("flex flex-col", hasConnectors ? "py-2" : "py-3", !showHandleNames && "relative")}
	>
		{#if hasConnectors && showHandleNames}
			<div class="flex justify-between self-stretch py-2">
				<div class="flex min-w-fit max-w-full flex-col gap-y-4">
					{#each inputs as { name, connectorType }}
						{@const handleId = makeHandleId({ title, id, name })}
						<div class="relative pl-4">
							<WrappedHandle
								id={handleId}
								type="target"
								class={cn(
									"mt-0.5 !border-none",
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
								>{name}
							</span>
						</div>
					{/each}
				</div>
				<div class="flex min-w-fit max-w-full flex-col gap-y-4">
					{#each outputs as { name, connectorType }}
						{@const handleId = makeHandleId({ title, id, name })}
						<div class="relative pr-4">
							<span
								class="flex-grow text-right font-medium text-zinc-900/75 font-sans text-label capsize dark:text-zinc-100/80"
								>{name}</span
							>
							<WrappedHandle
								id={handleId}
								type="source"
								class={cn(
									`!bg-${color}-edge mt-0.5 !border-none`,
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
		{:else if hasConnectors && !showHandleNames}
			{#each outputs as { name, connectorType }}
				{@const handleId = makeHandleId({ title, id, name })}
				<WrappedHandle
					id={handleId}
					type="source"
					class={cn(`!bg-${color}-edge !border-none`, getHandleShape(connectorType))}
					position={Position.Right}
					on:connect
					on:connectstart
					on:connectend
				/>
			{/each}
		{/if}
		{#if $$slots.additional}
			<div class="flex flex-col items-center justify-center gap-4 py-2">
				<slot name="additional" />
			</div>
		{/if}
	</div>
	{#if $$slots.error}
		<div class="flex flex-row items-center justify-center gap-x-1 pb-2 text-red-800">
			<AlertCircleIcon class="h-2.5 w-2.5" />
			<slot name="error" />
		</div>
	{/if}
	<slot name="controls" />
</div>

<style lang="postcss">
	:global(.svelte-flow__handle.circle-handle) {
		@apply h-3 w-3 rounded-full;
	}
	:global(.svelte-flow__handle.square-handle) {
		@apply h-2.5 w-2.5 rounded-none;
	}
	:global(.svelte-flow__handle.diamond-handle) {
		@apply h-3.5 w-3.5 origin-center rounded-none;
		-webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
		clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
	}
</style>
