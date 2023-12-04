<script lang="ts">
	import { createSwitch } from "@melt-ui/svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cn } from "$lib/util";
	import type { Writable } from "svelte/store";

	type $$Props = HTMLButtonAttributes & {
		checked: Writable<boolean>;
		label: string;
		switchPosition?: "left" | "right";
	};

	export let checked: Writable<boolean>;
	export let label: string;
	export let switchPosition: "left" | "right" = "left";

	const {
		elements: { root, input },
	} = createSwitch({
		defaultChecked: $checked,
		onCheckedChange: ({ next }) => {
			checked.set(next);
			return next;
		},
	});
</script>

<div
	class={cn(
		"nodrag flex flex-row-reverse items-center text-label",
		switchPosition === "right" && "flex-row"
	)}
>
	<label
		class={cn(
			"font-medium text-zinc-900/75 dark:text-zinc-100/80",
			switchPosition === "right" ? "pr-2" : "pl-2"
		)}
		for={$$props.id}
		id={`${$$props.id}-label`}
	>
		{label}
	</label>
	<button
		{...$root}
		use:root
		aria-labelledby={`${$$props.id}-label`}
		{...$$props}
		class={cn(
			"group relative h-4 w-8 cursor-default rounded-full border border-zinc-300 bg-zinc-100 py-0.5 transition-colors dark:border-zinc-700 dark:bg-zinc-900",
			$$props.class
		)}
	>
		<span
			class="thumb block h-2.5 w-2.5 translate-x-0.5 rounded-full bg-zinc-300 transition-all group-data-[state=checked]:bg-zinc-900/75 dark:bg-zinc-600 group-data-[state=checked]:dark:bg-zinc-50/80"
		/>
	</button>
	<input {...$input} use:input />
</div>

<style lang="postcss">
	:global([data-state="checked"]) .thumb {
		transform: translateX(
			calc(theme("spacing.8") - theme("spacing[2.5]") - theme("spacing.1"))
		);
	}
</style>
