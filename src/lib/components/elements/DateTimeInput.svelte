<script lang="ts">
	import { createDateField } from "@melt-ui/svelte";
	import type { Writable } from "svelte/store";
	import { cn } from "$lib/util";
	import { onMount } from "svelte";
	import type { ZonedDateTime } from "@internationalized/date";

	export let value: Writable<ZonedDateTime>;
	export let label: string;
	export let hideLabel: boolean = false;
	let className: string;
	export { className as class };

	const {
		elements: { field, segment, label: labelEl },
		states: { segmentContents },
		options: { locale },
	} = createDateField({ value, name: label, granularity: "minute" });

	onMount(() => {
		locale.set(navigator.language);
	});
</script>

<div
	class="nodrag flex flex-col gap-1 font-medium text-zinc-900/75 text-label dark:text-zinc-100/80"
>
	<span {...$labelEl} use:labelEl class={hideLabel ? "sr-only" : ""}>
		{label}
	</span>
	<div
		{...$field}
		use:field
		aria-disabled={$field["aria-disabled"] === "true" ? "true" : "false"}
		aria-readonly={$field["aria-readonly"] === "true" ? "true" : "false"}
		class={cn(
			"flex h-8 w-44 min-w-fit max-w-full items-center rounded-lg bg-zinc-100 px-3 py-1.5 ring-1 ring-zinc-300 dark:bg-zinc-900 dark:ring-zinc-700",
			className
		)}
	>
		{#each $segmentContents as seg}
			<div
				{...$segment(seg.part)}
				use:segment
				class="rounded-md ring-offset-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
			>
				{seg.value === ", " ? " " : seg.value}
			</div>
		{/each}
	</div>
</div>
