<script lang="ts" context="module">
	import type { Node, Edge, NodeProps } from "@xyflow/svelte";
	import { nodeCategories, nodeTypeToCategory } from "$lib/flow/components/nodes";
	import WrappedHandle from "$lib/flow/components/WrappedHandle.svelte";

	export const REST_HANDLE_NAME = "...rest";

	export const ConnectorType = {
		Data: "data",
		List: "list",
		Condition: "condition",
	};

	export type ConnectorType = (typeof ConnectorType)[keyof typeof ConnectorType];

	export type CustomNodeProps = Partial<NodeProps> & {
		title: string;
		description: string;
		color: string;
		inputs: Array<InputOutput>;
		outputs: Array<InputOutput>;
		showHandleNames?: boolean;
		copyable?: boolean;
		deletable?: boolean;
		inFlow?: boolean;
		hasBody?: boolean;
		// Needed because we can't conditionally render slots
		error?: boolean;
	};

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
	import { Position, useNodes, useEdges, type Connection } from "@xyflow/svelte";
	import { AlertCircleIcon } from "lucide-svelte";
	import type { InputOutput } from "$lib/flow/types";
	import { writable, type Writable } from "svelte/store";
	import { makeHandleId } from "$lib/util";
	import { createId } from "@paralleldrive/cuid2";
	import NodeActions from "$lib/flow/components/NodeActions.svelte";

	type $$Props = CustomNodeProps;
	type $$Slots = {
		default: never;
		additional: {};
		error: {};
		controls: {};
	};

	export let id = createId();
	export let selected: $$Props["selected"] = undefined;

	export let title: string;
	export let color: string;

	export let showHandleNames = true;
	export let inFlow = true;
	export let hasBody = true;
	export let error = false;

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

	const edgeTargetHandleToEdgeColor: Record<string, string> = {};

	// When an edge is created whose source is this node, its colour should be this node's colour
	function onSourceConnect(connections: Array<Connection>) {
		// The only way more than one connection can be created at a time is if nodes are copied/pasted
		if (connections.length !== 1) return;
		const connection = connections[0];
		if (connection.source !== id || !connection.sourceHandle) return;
		const edgeIndex = $edges.findIndex(
			(edge) =>
				edge.source === connection.source && edge.sourceHandle === connection.sourceHandle
		);
		if (edgeIndex === -1) return;
		$edges[edgeIndex].style = `--xy-edge-stroke: var(--edge-${color});`;
		$edges = $edges;
	}

	// When an edge is created whose target is this node, the target handle should take on the source node's colour
	function onTargetConnect(connections: Array<Connection>) {
		// The only way more than one connection can be created at a time is if nodes are copied/pasted
		if (connections.length !== 1) return;
		const connection = connections[0];
		if (connection.target !== id || !connection.targetHandle) return;
		const edge = $edges.find(
			(edge) =>
				edge.target === connection.target && edge.targetHandle === connection.targetHandle
		);
		if (!edge) return;
		const edgeColor = getEdgeColor(edge, $nodes);
		if (edgeColor) edgeTargetHandleToEdgeColor[connection.targetHandle] = edgeColor;
	}
</script>

<div
	class={cn(
		"relative flex flex-col rounded-2xl bg-zinc-100 ring-1 ring-zinc-300 dark:bg-zinc-900 dark:ring-zinc-700",
		$$props.selected && "ring-2 ring-zinc-400 dark:ring-zinc-600",
		inFlow ? "w-52" : "w-full"
	)}
	role="presentation"
	on:click
>
	{#if selected}
		<NodeActions {...$$props} />
	{/if}
	<div
		class={cn(
			"flex w-full items-center justify-center py-2.5",
			`bg-header-${color}`,
			hasBody
				? "rounded-t-2xl border-b border-b-zinc-300 dark:border-b-zinc-700"
				: "rounded-2xl"
		)}
	>
		<span class="font-semibold text-zinc-900/75 text-title dark:text-zinc-50/75">{title}</span>
	</div>
	{#if hasBody}
		<div
			class={cn(
				"flex flex-col",
				hasConnectors ? "py-2" : "py-3",
				!showHandleNames && "relative"
			)}
		>
			{#if hasConnectors && showHandleNames}
				<div class="flex justify-between self-stretch py-2">
					<div class="flex min-w-fit max-w-full flex-col gap-y-4">
						{#each inputs as { name, connectorType }}
							{#if name !== REST_HANDLE_NAME}
								<!-- targets -->
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
										onconnect={onTargetConnect}
									/>
									<span
										class="font-medium text-zinc-900/75 font-sans text-label capsize dark:text-zinc-100/80"
										>{name}
									</span>
								</div>
							{/if}
						{/each}
					</div>
					<div class="flex min-w-fit max-w-full flex-col gap-y-4">
						{#each outputs as { name, connectorType }}
							<!-- sources -->
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
									onconnect={onSourceConnect}
								/>
							</div>
						{/each}
					</div>
				</div>
			{:else if hasConnectors && !showHandleNames}
				{#each outputs as { name, connectorType }}
					<!-- sources -->
					{@const handleId = makeHandleId({ title, id, name })}
					<WrappedHandle
						id={handleId}
						type="source"
						class={cn(`!bg-${color}-edge !border-none`, getHandleShape(connectorType))}
						position={Position.Right}
						onconnect={onSourceConnect}
					/>
				{/each}
			{/if}
			{#if $$slots.additional}
				<div class="flex flex-col items-center justify-center gap-4 py-2">
					<slot name="additional" />
				</div>
			{/if}
		</div>
	{:else}
		{@const handle = inputs[0] || outputs[0]}
		{@const handleType = inputs[0] ? "target" : "source"}
		{@const handlePosition = inputs[0] ? Position.Left : Position.Right}
		{@const handleId = makeHandleId({ title, id, name: handle.name })}
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
			position={handlePosition}
			onconnect={onSourceConnect}
		/>
	{/if}
	{#if error}
		<div
			class="flex flex-row items-center justify-center gap-x-1 px-1.5 pb-2 font-medium text-red-800 text-detail dark:text-red-300"
		>
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
