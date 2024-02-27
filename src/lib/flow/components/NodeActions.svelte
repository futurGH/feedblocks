<script lang="ts">
	import { fade } from "svelte/transition";
	import { cubicInOut } from "svelte/easing";
	import TooltipButton from "$lib/components/elements/TooltipButton.svelte";
	import { CopyIcon, Trash2Icon, InfoIcon } from "lucide-svelte";
	import { duplicateNode } from "$lib/util";
	import { useNodes, useSvelteFlow } from "@xyflow/svelte";
	import type { CustomNodeProps } from "$lib/flow/components/nodes/BaseNode.svelte";

	type $$Props = CustomNodeProps;

	export let id: $$Props["id"] = undefined;

	export let title: $$Props["title"];
	export let description: $$Props["description"];
	export let inputs: $$Props["inputs"] = [];
	export let outputs: $$Props["outputs"] = [];

	const nodes = useNodes();
	const { deleteElements } = useSvelteFlow();

	export let deletable: boolean = $nodes.find((node) => node.id === id)?.deletable ?? true;
	export let copyable: boolean = true;

	let descriptionOpen = false;
</script>

{#if descriptionOpen}
	<div
		class="absolute -top-12 z-20 flex w-full -translate-y-full rounded-lg bg-zinc-50 font-medium lowercase text-zinc-900/75 ring-1 ring-zinc-300 dark:bg-zinc-900 dark:text-zinc-100/80 dark:ring-zinc-700"
		transition:fade={{ duration: 100, easing: cubicInOut }}
	>
		<div class="flex flex-col gap-1 p-2 leading-relaxed">
			<span class="font-semibold text-title">{title}</span>
			<span class="text-label">{@html description}</span>
			{#if inputs.length}<span class="font-semibold text-label">inputs</span>{/if}
			{#each inputs.filter((input) => input.description) as { name, description: inputDescription } (name)}
				<div class="flex flex-col gap-1">
					<span class="text-label"
						><span class="font-semibold">{name}: </span>{inputDescription}</span
					>
				</div>
			{/each}
			{#if outputs.length}<span class="font-semibold text-label">outputs</span>{/if}
			{#each outputs.filter((output) => output.description) as { name, description: outputDescription } (name)}
				<div class="flex flex-col gap-1">
					<span class="text-label"
						><span class="font-semibold">{name}: </span>{outputDescription}</span
					>
				</div>
			{/each}
		</div>
	</div>
{/if}
<div
	data-node-actions
	class="absolute -top-2 left-1/2 flex h-8 -translate-x-1/2 -translate-y-full flex-row divide-x divide-zinc-300 overflow-clip rounded-lg bg-zinc-100 text-zinc-900/75 ring-1 ring-zinc-300 dark:divide-zinc-700 dark:bg-zinc-900 dark:text-zinc-700 dark:ring-zinc-700"
>
	<TooltipButton
		buttonProps={{
			class: "flex h-8 w-8 items-center justify-center hover:bg-zinc-300 hover:dark:bg-zinc-700",
		}}
		tooltipProps={{
			class: "h-7 max-w-52 px-3 py-1.5 text-xs font-medium text-zinc-900/75 dark:text-zinc-100/60",
		}}
		on:click={() => (descriptionOpen = !descriptionOpen)}
		on:m-blur={() => (descriptionOpen = false)}
	>
		<InfoIcon class="h-3.5 w-3.5" slot="button" />
		<span slot="tooltip">description</span>
	</TooltipButton>
	<TooltipButton
		buttonProps={{
			class: "flex h-8 w-8 items-center justify-center disabled:text-zinc-900/30 disabled:dark:text-zinc-100/40 hover:enabled:bg-zinc-300 hover:enabled:dark:bg-zinc-700",
			disabled: !copyable,
		}}
		tooltipProps={{
			class: "px-3 py-1.5 text-xs font-medium text-zinc-900/75 dark:text-zinc-100/60",
		}}
		createProps={{
			onOpenChange: ({ next }) => (copyable ? next : false),
		}}
		on:click={() => {
			const newNode = duplicateNode($$props);
			if (newNode) nodes.update((nodes) => [...nodes, newNode]);
		}}
	>
		<CopyIcon class="h-3.5 w-3.5" slot="button" />
		<span slot="tooltip">duplicate</span>
	</TooltipButton>
	<TooltipButton
		buttonProps={{
			class: "group flex h-8 w-8 items-center justify-center disabled:text-zinc-900/30 disabled:dark:text-zinc-100/40 hover:enabled:bg-red-200 hover:enabled:dark:bg-red-900",
			disabled: !deletable,
		}}
		tooltipProps={{
			class: "px-3 py-1.5 text-xs font-medium text-zinc-900/75 dark:text-zinc-100/80",
		}}
		createProps={{
			onOpenChange: ({ next }) => (deletable ? next : false),
		}}
		on:click={() => id && deleteElements([{ id }])}
	>
		<Trash2Icon
			class="h-3.5 w-3.5 group-hover:enabled:text-red-800 group-hover:enabled:dark:text-red-300"
			slot="button"
		/>
		<span slot="tooltip">delete</span>
	</TooltipButton>
</div>
