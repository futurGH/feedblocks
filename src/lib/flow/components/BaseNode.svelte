<script lang="ts">
	import { cn } from "$lib/util";

	export let title: string;
	export let headerColor: string;
</script>

<div class="flex flex-col overflow-clip rounded-2xl border border-zinc-300">
	<div class={cn("flex w-full items-center justify-center py-2.5", headerColor)}></div>
</div>
