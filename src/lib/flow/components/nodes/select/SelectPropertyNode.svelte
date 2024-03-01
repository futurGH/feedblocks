<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "item",
			type: "any",
			description: "The object to select a property from",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			description: "The value of the selected property",
		},
	];
	export const newData = () => ({
		path: writable<string>(),
		outputType: () => "any",
	});
	export const title = "select property";
	export const description = "Selects a property from an item";
</script>

<script lang="ts">
	import { type NodeProps, useHandleConnections, useSvelteFlow } from "@xyflow/svelte";
	import { types } from "$lib/conversion/types";
	import { cn, makeHandleId } from "$lib/util";
	import { createCombobox } from "@melt-ui/svelte";
	import { onMount } from "svelte";
	import { ChevronDown, ChevronUp } from "lucide-svelte";

	type $$Props = NodeProps;

	export let id: $$Props["id"];

	export let data = newData();
	let { path } = data;

	const { getNode } = useSvelteFlow();

	let inputType: string | undefined;

	let lastValidType: string | undefined;

	const inputConnections = useHandleConnections({
		nodeId: id,
		type: "target",
		id: makeHandleId({ title, id, name: "item" }),
	});
	inputConnections.subscribe((connections) => {
		// Whenever the input type changes, we want to update autocompletion & type resolution accordingly
		const sourceNode = getNode(connections[0]?.source);
		inputType = sourceNode?.data?.outputType?.();
		if (inputType) lastValidType = inputType;
		updatePropertyAutocompletion();
	});

	let inputDiv: HTMLDivElement;

	const {
		elements: { menu, input, option: optionEl, label: labelEl },
		states: { open, inputValue, selected },
		helpers: { closeMenu },
		options: { portal },
	} = createCombobox({
		forceVisible: true,
		loop: true,
	});

	// Whenever menu is closed, set input value to the selected value
	$: if (!$open && $selected?.label) inputValue.set($selected.label);

	$: pathIsCurrentlyComplete = $inputValue === $path;

	onMount(() => {
		// This is necessary for the list to scale proportionately to the input when in a flow
		portal.set(inputDiv.closest<HTMLElement>(".svelte-flow__node"));
		return () => closeMenu();
	});

	let propertyAutocompletion: Array<string> = [];

	inputValue.subscribe((value) => {
		const currentOutputType = resolvePath(value);

		//  If the current path resolves to a type, we want to update the output type accordingly
		if (currentOutputType) {
			lastValidType = currentOutputType;
			data.outputType = () => currentOutputType;
			$path = value;
		} else {
			if (value.includes(".")) {
				// Otherwise, we want to try to resolve the path without the last part
				const validPathSoFar = value.split(".").slice(0, -1).join(".");
				const lastPotentialValidType = resolvePath(validPathSoFar);
				if (lastPotentialValidType) {
					lastValidType = lastPotentialValidType;
					data.outputType = () => lastPotentialValidType;
					$path = validPathSoFar;
				}
			} else {
				$path = "";
				lastValidType = inputType;
			}
		}

		updatePropertyAutocompletion();
	});

	function updatePropertyAutocompletion() {
		if (!lastValidType) return;

		if (lastValidType === inputType && lastValidType.endsWith("[]")) {
			lastValidType = lastValidType.slice(0, -2);
		}

		if (lastValidType in types) {
			const currentKey = $inputValue.split(".")?.pop()?.toLowerCase();
			propertyAutocompletion = Object.keys(types[lastValidType as keyof typeof types] || {});
			console.log($path, $inputValue, propertyAutocompletion);
			// This means what is currently being typed is not a valid path yet
			if ($path !== $inputValue) {
				propertyAutocompletion = propertyAutocompletion.filter((key) =>
					key.toLowerCase().startsWith(currentKey || "")
				);
			}
		} else {
			propertyAutocompletion = [];
		}
	}

	function resolvePath(pathStr = $path) {
		if (!inputType) return;
		let currentType = inputType.endsWith("[]") ? inputType.slice(0, -2) : inputType;
		if (!(currentType in types)) return;
		let currentObject: Record<string, string> = types[currentType as keyof typeof types];
		for (const part of pathStr.split(".")) {
			if (!part) return null;

			currentType = currentObject[part];
			if (!currentType) return null;

			if (currentType in types) {
				currentObject = types[currentType as keyof typeof types];
			}
		}

		return currentType;
	}
</script>

<BaseNode
	{title}
	{description}
	color="amber"
	showHandleNames={false}
	{inputs}
	{outputs}
	{...$$props}
>
	<svelte:fragment slot="additional">
		<div
			class="nodrag nopan flex max-w-full flex-col gap-1 font-medium text-zinc-900/75 text-label dark:text-zinc-100/80"
			bind:this={inputDiv}
		>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label {...$labelEl} use:labelEl class="sr-only">
				<span>select path</span>
			</label>
			<div class="relative">
				<input
					{...$input}
					use:input
					class="flex h-8 w-44 max-w-full items-center justify-between gap-x-1 rounded-lg bg-zinc-100 py-1.5 pl-3 pr-7 ring-1 ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-900 dark:ring-zinc-700 focus:dark:ring-zinc-600"
					placeholder="likers.0.handle"
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
				class={cn(
					"nopan nowheel z-10 flex w-44 min-w-fit max-w-full flex-grow flex-col rounded-lg border border-zinc-300 bg-zinc-100",
					propertyAutocompletion.length && "h-52 overflow-y-scroll"
				)}
				{...$menu}
				use:menu
			>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					class="flex min-w-fit flex-grow flex-col rounded-lg p-1 font-medium text-zinc-900/75 text-label dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100/80"
					tabindex="0"
				>
					{#each propertyAutocompletion as key, i (i)}
						<li
							{...$optionEl({ label: $path ? `${$path}.${key}` : key, value: key })}
							use:optionEl
							class={"relative flex cursor-pointer scroll-my-2 items-center justify-center rounded-lg p-2 " +
								"data-[highlighted]:bg-zinc-900/10 data-[highlighted]:dark:bg-zinc-100/10"}
						>
							{#if $path}
								<span
									>{$path.replaceAll(".", ".\u200B")}.<wbr /><span
										class="font-semibold">{key}</span
									></span
								>
							{:else}
								{key}
							{/if}
						</li>
					{:else}
						{#if pathIsCurrentlyComplete}
							<li
								{...$optionEl({ label: $path, value: $path })}
								use:optionEl
								class="relative cursor-pointer flex items-center justify-center p-2 rounded-lg bg-zinc-900/10 dark:bg-zinc-100/10"
							>
								<span>{$path.replaceAll(".", ".\u200B")}</span>
							</li>
						{:else}
							<li
								class="relative cursor-pointer flex items-center justify-center py-2"
							>
								No results
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		{/if}
	</svelte:fragment>
</BaseNode>
