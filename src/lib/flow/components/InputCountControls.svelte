<script lang="ts">
	import type { InputOutput } from "$lib/flow/types";
	import { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { PlusIcon, MinusIcon } from "lucide-svelte";

	export let inputs: Array<InputOutput>;

	const alphabet = "abcdefghijklmnopqrstuvwxyz";

	const buttonStyle =
		"flex h-5 w-5 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 transition-transform hover:scale-125 dark:border-zinc-600 dark:bg-zinc-900";
	const iconStyle = "h-2.5 w-2.5 text-zinc-700 dark:text-zinc-400";
</script>

<div class="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 flex-row gap-1">
	{#if inputs.length < 10}
		<button
			class={buttonStyle}
			on:click={() => {
				inputs = [
					...inputs,
					{
						connectorType: ConnectorType.Data,
						name: alphabet[inputs.length],
						type: "number",
					},
				];
			}}
		>
			<PlusIcon strokeWidth={2} class={iconStyle} />
		</button>
	{/if}
	{#if inputs.length > 2}
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
