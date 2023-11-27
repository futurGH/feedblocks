<script context="module" lang="ts">
	export const ConnectorType = {
		Data: "data",
		List: "list",
		Condition: "condition",
	};
	export type ConnectorType = (typeof ConnectorType)[keyof typeof ConnectorType];
</script>

<script lang="ts">
	import { cn } from "$lib/util";
	import {
		Position,
		Handle,
		type NodeProps,
		useNodes,
		useEdges,
		type Connection,
	} from "@xyflow/svelte";
	import { nodeCategories, nodeTypeToCategory } from "$lib/flow/components/nodes/index";

	type $$Props = NodeProps & {
		title: string;
		color: string;
		inputs: Array<{ name: string; type: ConnectorType }>;
		outputs: Array<{ name: string; type: ConnectorType }>;
	};
	type $$Slots = {
		default: never;
		additional: {};
	};

	export let id: $$Props["id"];

	export let title: string;
	export let color: string;

	export let inputs: Array<{ name: string; type: ConnectorType }> = [];
	export let outputs: Array<{ name: string; type: ConnectorType }> = [];
	$: hasConnectors = inputs.length > 0 || outputs.length > 0;

	const nodes = useNodes();
	const edges = useEdges();

	let inputConnectionColorMapping: Record<string, string> = {};
	edges.subscribe((edges) => {
		inputConnectionColorMapping = edges.reduce<Record<string, string>>((acc, edge) => {
			if (edge.target !== id || !edge.targetHandle) return acc;

			const source = $nodes.find((node) => node.id === edge.source);
			if (!source?.type) return acc;

			const connectingNodeCategory = nodeTypeToCategory[source.type];
			if (!connectingNodeCategory) return acc;

			acc[edge.targetHandle] = nodeCategories[connectingNodeCategory].color;
			return acc;
		}, {});
	});

	function getHandleShape(type: ConnectorType) {
		switch (type) {
			case ConnectorType.List:
				return "square-handle";
			case ConnectorType.Condition:
				return "diamond-handle";
			case ConnectorType.Data:
			default:
				return "circle-handle";
		}
	}

	function onHandleConnect({ detail: { connection } }: CustomEvent<{ connection: Connection }>) {
		const edge = $edges.find(
			(edge) =>
				edge.sourceHandle === connection.sourceHandle &&
				edge.targetHandle === connection.targetHandle
		);
		if (edge) edge.style = `--edge-stroke: var(--edge-${color})`;
		$edges = $edges;
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
					{#each inputs as { name, type }}
						{@const handleId = id + "-" + name}
						<div class="relative pl-4">
							<Handle
								id={id + "-" + name}
								type="target"
								class={cn(
									`mt-0.5 !border-none`,
									getHandleShape(type),
									inputConnectionColorMapping[handleId] &&
										`!bg-${inputConnectionColorMapping[handleId]}-edge`
								)}
								position={Position.Left}
								on:connect={onHandleConnect}
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
					{#each outputs as { name, type }}
						{@const handleId = id + "-" + name}
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
									getHandleShape(type)
								)}
								position={Position.Right}
								on:connect={onHandleConnect}
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
