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
</script>

<div
	class="flex w-52 flex-col overflow-clip rounded-2xl border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
>
	<div
		class={cn(
			"flex w-full items-center justify-center border-b border-b-zinc-300 py-2.5 dark:border-b-zinc-700",
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
						<div class="pl-4">
							<Handle
								type="target"
								position={Position.Left}
								on:connect
								on:connectstart
								on:connectend
							/>
							<span class="text-label font-medium text-zinc-600 dark:text-zinc-300"
								>{name}</span
							>
						</div>
					{/each}
				</div>
				<!-- outputs -->
			</div>
		{/if}
	</div>
</div>
