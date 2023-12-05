<script lang="ts" generics="T = InputOutput">
	import { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { PlusIcon, MinusIcon } from "lucide-svelte";

	type $$Props<T> = {
		inputs: Array<T>;
		newInput?: (inputs: Array<T>) => T;
		min?: number;
		max?: number;
	};
	export let inputs: Array<T>;
	export let newInput: ((inputs: Array<T>) => T) | undefined = undefined;
	export let min = 2;
	export let max = 10;

	const alphabet = "abcdefghijklmnopqrstuvwxyz";

	const buttonStyle =
		"flex h-5 w-5 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 transition-transform hover:scale-125 dark:border-zinc-600 dark:bg-zinc-900";
	const iconStyle = "h-2.5 w-2.5 text-zinc-700 dark:text-zinc-400";

	function addInput() {
		inputs = [
			...inputs,
			newInput?.(inputs) ??
				({
					connectorType: ConnectorType.Data,
					name: alphabet[inputs.length],
					type: "number",
				} as T),
		];
	}
</script>

<div class="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 flex-row gap-1">
	{#if inputs.length < max}
		<button class={buttonStyle} on:click={addInput}>
			<PlusIcon strokeWidth={2} class={iconStyle} />
		</button>
	{/if}
	{#if inputs.length > min}
		<button
			class={buttonStyle}
			on:click={() => {
				inputs = inputs.slice(0, -1);
			}}
		>
			<MinusIcon strokeWidth={2} class={iconStyle} />
		</button>
	{/if}
</div>
