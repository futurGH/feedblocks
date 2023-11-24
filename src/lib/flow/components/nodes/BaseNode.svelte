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
	import { Position, Handle } from "@xyflow/svelte";

	export let title: string;
	export let headerColor: string;

	export let inputs: Array<{ name: string; type: ConnectorType }> = [];
	export let outputs: Array<{ name: string; type: ConnectorType }> = [];
	$: hasConnectors = inputs.length > 0 || outputs.length > 0;

	const handleShape = (type: ConnectorType) => {
		switch (type) {
			case ConnectorType.List:
				return "square-handle";
			case ConnectorType.Condition:
				return "diamond-handle";
			case ConnectorType.Data:
			default:
				return "circle-handle";
		}
	};
</script>

<div
	class="flex w-52 flex-col rounded-2xl border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
>
	<div
		class={cn(
			"flex w-full items-center justify-center rounded-t-2xl border-b border-b-zinc-300 py-2.5 dark:border-b-zinc-700",
			headerColor
		)}
	>
		<span class="text-title font-semibold text-zinc-900/75">{title}</span>
	</div>
	<div class={cn("flex flex-col", hasConnectors ? "py-2" : "py-3")}>
		{#if hasConnectors}
			<div class="flex justify-between self-stretch py-2">
				<div class="flex min-w-fit max-w-full flex-col gap-y-4">
					{#each inputs as { name, type }}
						<div class="relative pl-4">
							<Handle
								type="target"
								class={cn("mt-0.5", handleShape(type))}
								position={Position.Left}
								on:connect
								on:connectstart
								on:connectend
							/>
							<span
								class="capsize font-sans text-label font-medium text-zinc-900/75 dark:text-zinc-100/80"
								>{name}</span
							>
						</div>
					{/each}
				</div>
				<div class="flex min-w-fit max-w-full flex-col gap-y-4">
					{#each outputs as { name, type }}
						<div class="relative flex pr-4">
							<span
								class="capsize flex-grow text-right font-sans text-label font-medium text-zinc-900/75 dark:text-zinc-100/80"
								>{name}</span
							>
							<Handle
								type="source"
								class={cn("mt-0.5", handleShape(type))}
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
	</div>
</div>

<style lang="postcss">
	:global(.svelte-flow .svelte-flow__handle) {
		@apply border-none bg-zinc-700;
	}
	:global(.dark .svelte-flow .svelte-flow__handle) {
		@apply bg-zinc-500;
	}

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
