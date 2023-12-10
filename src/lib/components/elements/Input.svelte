<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { createLabel } from "@melt-ui/svelte";
	import { cn } from "$lib/util";

	type $$Props = Omit<HTMLInputAttributes, "value"> & {
		value: string;
		label: string;
		width?: string;
		hideLabel?: boolean;
	};
	type $$Slots = {
		default: never;
		before: {};
		after: {};
	};

	let className: string | null | undefined = null;
	export let value: string;
	export let label: string;
	export let width = "";
	export let hideLabel = false;
	export { className as class };

	const {
		elements: { root },
	} = createLabel();
</script>

<div
	class="nodrag flex flex-col items-start justify-center font-medium text-zinc-900/75 text-label dark:text-zinc-100/80"
>
	<label
		{...$root}
		use:root
		data-melt-part="root"
		class={hideLabel ? "sr-only" : "mb-1"}
		for={$$props.id}
	>
		{label}
	</label>
	<div class={cn("relative min-w-fit max-w-full rounded-lg", width)}>
		{#if $$slots.before}
			<div
				class="pointer-events-none absolute inset-y-0 left-0 flex items-center py-1.5 pl-3"
			>
				<slot name="before" />
			</div>
		{/if}
		<input
			class={cn(
				"block h-8 rounded-lg border-0 bg-zinc-100 px-3 py-1.5 ring-1 ring-zinc-300 placeholder:text-zinc-900/50 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-900 dark:ring-zinc-700 placeholder:dark:text-zinc-100/60 focus:dark:ring-zinc-600",
				width,
				className
			)}
			bind:value
			{...$$restProps}
		/>
		{#if $$slots.after}
			<div
				class="pointer-events-none absolute inset-y-0 right-0 flex items-center py-1.5 pr-3"
			>
				<slot name="after" />
			</div>
		{/if}
	</div>
</div>
