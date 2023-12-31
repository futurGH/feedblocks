<script lang="ts">
	import { createSelect, type SelectOption } from "@melt-ui/svelte";
	import { ChevronUp, ChevronDown } from "lucide-svelte";
	import type { Writable } from "svelte/store";
	import { onMount } from "svelte";
	import { cn } from "$lib/util";

	export let options: Array<SelectOption<string>>;
	export let selected: Writable<SelectOption<string>>;

	export let placeholder: string = "Select an option";
	export let label: string;
	export let hideLabel: boolean = false;
	export let inFlow: boolean = false;
	export let width: string = "";

	let selectDiv: HTMLDivElement;

	const {
		elements: { trigger, menu, option: optionEl, label: labelEl },
		states: { open },
		helpers: { closeMenu },
		options: { portal },
	} = createSelect({
		forceVisible: true,
		loop: true,
		positioning: {
			fitViewport: true,
			sameWidth: true,
		},
		selected,
	});

	onMount(() => {
		// This is necessary for the list to scale proportionately to the input when in a flow
		if (inFlow) {
			portal.set(selectDiv.closest<HTMLElement>(".svelte-flow__node"));
		}
		return () => closeMenu();
	});
</script>

<div
	class="nodrag flex flex-col gap-1 font-medium text-zinc-900/75 text-label dark:text-zinc-100/80"
	bind:this={selectDiv}
>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label {...$labelEl} use:labelEl class={hideLabel ? "sr-only" : ""}>
		<span>
			{label}
		</span>
	</label>
	<button
		class={cn(
			"flex h-8 w-44 min-w-fit max-w-full items-center justify-between rounded-lg bg-zinc-100 px-3 py-1.5 ring-1 ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-900 dark:ring-zinc-700 focus:dark:ring-zinc-600",
			width
		)}
		{...$trigger}
		use:trigger
	>
		{$selected.label || placeholder}
		{#if $open}
			<ChevronUp class="h-4 w-4" />
		{:else}
			<ChevronDown class="h-4 w-4" />
		{/if}
	</button>
	{#if $open}
		<ul
			class={cn(
				"z-10 flex w-44 min-w-fit max-w-full flex-col overflow-y-auto rounded-lg border border-zinc-300 bg-zinc-100 p-1 font-medium text-zinc-900/75 text-label dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100/80",
				width
			)}
			{...$menu}
			use:menu
		>
			{#each options as option, i (i)}
				<li
					class="relative flex cursor-pointer scroll-my-2 items-center justify-center rounded-lg p-2 data-[highlighted]:bg-zinc-900/10 data-[selected]:underline data-[highlighted]:dark:bg-zinc-100/10"
					use:optionEl
					{...$optionEl(option)}
				>
					{option.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>
