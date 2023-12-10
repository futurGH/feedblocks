<script lang="ts">
	import type { HTMLButtonAttributes, HTMLAttributes } from "svelte/elements";
	import { createTooltip, type CreateTooltipProps } from "@melt-ui/svelte";
	import { cn } from "$lib/util";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { cubicInOut } from "svelte/easing";

	export let buttonProps: HTMLButtonAttributes = {};
	export let createProps: CreateTooltipProps = {};
	export let tooltipProps: HTMLAttributes<HTMLDivElement> = {};
	export let inFlow = true;

	let button: HTMLButtonElement;

	const {
		elements: { trigger, content },
		states: { open },
		options: { portal },
	} = createTooltip({
		openDelay: 0,
		closeDelay: 0,
		group: true,
		...createProps,
		positioning: {
			placement: "top",
			...createProps.positioning,
		},
	});

	onMount(() => {
		// This is necessary for the list to scale proportionately to zoom when in a flow
		if (inFlow) {
			portal.set(button.closest<HTMLElement>(".svelte-flow__node"));
		}
		return () => open.set(false);
	});
</script>

<button
	type="button"
	{...buttonProps}
	{...$trigger}
	use:trigger
	bind:this={button}
	on:m-pointerenter
	on:m-pointerleave
	on:click
	on:m-blur
>
	<slot name="button" />
</button>
{#if $open}
	<div
		{...tooltipProps}
		class={cn(
			"z-10 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900",
			tooltipProps.class
		)}
		{...$content}
		use:content
		transition:fade={{ duration: 100, easing: cubicInOut }}
	>
		<slot name="tooltip" />
	</div>
{/if}
