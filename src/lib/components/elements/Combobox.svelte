<script lang="ts" context="module">
	export type ComboboxItem = { value: string; label: string };
</script>

<script lang="ts">
	import { createCombobox } from "@melt-ui/svelte";
	import { ChevronUp, ChevronDown } from "lucide-svelte";
	import type { Writable } from "svelte/store";
	import { onMount } from "svelte";

	export let options: Array<ComboboxItem>;
	export let selected: Writable<ComboboxItem>;

	export let placeholder: string = "Select an option";
	export let label: string;
	export let hideLabel: boolean = false;

	export let inFlow: boolean = false;

	let comboboxDiv: HTMLDivElement;

	const {
		elements: { menu, input, option: optionEl, label: labelEl },
		states: { open, inputValue, touchedInput },
		helpers: { closeMenu },
		options: { portal },
	} = createCombobox({
		forceVisible: true,
		loop: true,
		selected,
	});

	onMount(() => {
		// This is necessary for the list to scale proportionately to the input when in svelte-flow
		if (inFlow) {
			portal.set(comboboxDiv.closest<HTMLElement>(".svelte-flow__node"));
		}
		return () => closeMenu();
	});

	$: if (!$open) $inputValue = $selected?.label ?? "";
	$: filteredOptions = $touchedInput
		? options.filter((option) => option.label.toLowerCase().includes($inputValue.toLowerCase()))
		: options;
</script>

<div
	class="nodrag flex max-w-full flex-col gap-1 font-medium text-zinc-900/75 text-label dark:text-zinc-100/80"
	bind:this={comboboxDiv}
>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label {...$labelEl} use:labelEl class={hideLabel ? "sr-only" : ""}>
		<span>
			{label}
		</span>
	</label>
	<div class="relative">
		<input
			{...$input}
			use:input
			class="flex h-8 w-44 max-w-full items-center justify-between gap-x-1 rounded-lg bg-zinc-100 px-3 py-1.5 ring-1 ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-900 dark:ring-zinc-700 focus:dark:ring-zinc-600"
			{placeholder}
		/>
		<div class="pointer-events-none absolute right-2 top-1/2 z-10 -translate-y-1/2">
			{#if $open}
				<ChevronUp class="h-4 w-4" />
			{:else}
				<ChevronDown class="h-4 w-4" />
			{/if}
		</div>
	</div>
</div>
{#if $open}
	<div
		class="z-10 flex w-44 min-w-fit max-w-full flex-col overflow-hidden rounded-lg"
		{...$menu}
		use:menu
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul
			class="flex max-h-full flex-col overflow-y-auto rounded-lg border border-zinc-300 bg-zinc-100 p-1 font-medium text-zinc-900/75 text-label dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100/80"
			tabindex="0"
		>
			{#each filteredOptions as option, i (i)}
				<li
					{...$optionEl(option)}
					use:optionEl
					class={"relative flex cursor-pointer scroll-my-2 items-center justify-center rounded-lg p-2 " +
						"data-[highlighted]:bg-zinc-900/10 data-[selected]:underline data-[highlighted]:dark:bg-zinc-100/10"}
				>
					{option.label}
				</li>
			{:else}
				<li class="relative cursor-pointer flex items-center justify-center py-2">
					No results
				</li>
			{/each}
		</ul>
	</div>
{/if}
