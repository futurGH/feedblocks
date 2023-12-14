<script lang="ts">
	import { useStore, Handle, type HandleComponentProps } from "@xyflow/svelte";
	import { cn } from "$lib/util";

	type $$Props = HandleComponentProps;

	let inFlow = true;
	try {
		// Calling a Svelte Flow hook outside of a flow provider will error
		// We can use this to render a plain div instead of a handle
		useStore();
	} catch (e) {
		inFlow = false;
	}
</script>

{#if inFlow}
	<Handle {...$$props} />
{:else}
	<div
		{...$$props}
		class={cn(
			"svelte-flow__handle",
			`svelte-flow__handle-${$$props.position}`,
			"nodrag",
			"nopan",
			$$props.position,
			$$props.class
		)}
	/>
{/if}
