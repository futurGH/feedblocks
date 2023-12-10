<script lang="ts">
	import { ChevronLeftIcon } from "lucide-svelte";
	import { cn } from "$lib/util";
	import { nodeCategories } from "$lib/flow/components/nodes";
	import Input from "$lib/components/elements/Input.svelte";
	import type { ComponentType } from "svelte";

	type NodeImport = {
		id: string;
		name: string;
		default: ComponentType;
	};

	let open = true;
	let filter = "";

	$: filteredNodeCategories = Object.entries(nodeCategories).reduce<
		Array<{ name: string; id: string; nodes: Array<NodeImport> }>
	>((acc, [id, category]) => {
		const nodes = Object.entries(category.nodes).reduce<Array<NodeImport>>(
			(acc, [id, node]) => {
				if (id === "feedOutput") return acc;
				if (node.title.toLowerCase().includes(filter.toLowerCase())) {
					acc.push({ id, ...node });
				}
				return acc;
			},
			[]
		);
		if (!nodes.length) return acc;

		acc.push({
			name: category.name,
			id,
			nodes,
		});
		return acc;
	}, []);

	const onDragStart = (event: DragEvent, nodeType: string) => {
		if (!event.dataTransfer) return;

		event.dataTransfer.setData("application/svelteflow", nodeType);

		// For some absurd reason the cursor won't apply while dragging on Chrome unless we wait a bit
		setTimeout(() => (event.target as HTMLElement)?.classList.add("cursor-grabbing"), 50);
		event.dataTransfer.effectAllowed = "move";
	};

	const onDragEnd = (event: DragEvent) => {
		(event.target as HTMLElement)?.classList.remove("cursor-grabbing");
	};
</script>

<section
	class={cn(
		"fixed left-0 top-0 z-10 h-full w-[17rem] border-r border-r-zinc-300 bg-zinc-50/40 backdrop-blur-3xl transition-transform duration-500",
		!open && "-translate-x-full"
	)}
>
	<button
		class="absolute -right-2 top-4 z-0 translate-x-full rounded-r-full"
		aria-label={open ? "close sidebar" : "expand sidebar"}
		on:click={() => (open = !open)}
	>
		<ChevronLeftIcon
			class={cn(
				"h-6 w-6 origin-center text-zinc-400 transition-transform duration-500 ease-in-out",
				!open && "translate-x-2 rotate-180"
			)}
		/>
	</button>
	<div class="flex h-full flex-col overflow-y-scroll px-6 py-4">
		<span class="self-center font-medium text-zinc-900/75 text-lg">drag a node</span>
		<Input
			class="-mb-2 mt-6 bg-zinc-50"
			width="w-full"
			bind:value={filter}
			label="search"
			placeholder="search"
			hideLabel
		/>
		{#each filteredNodeCategories as category (category.id)}
			<div class="mt-12 flex flex-col">
				<span class="text-md mb-4 font-medium lowercase text-zinc-900/75"
					>{category.name}</span
				>
				<ul class="flex flex-col gap-8">
					{#each category.nodes as node (node.id)}
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<!-- see https://docs.dndkit.com/api-documentation/draggable/usedraggable -->
						<li
							class="w-full cursor-grab"
							tabindex="0"
							aria-roledescription={`draggable ${node.name} node`}
							draggable="true"
							on:dragstart={(e) => onDragStart(e, node.id)}
							on:dragend={onDragEnd}
						>
							<div
								class="pointer-events-none w-full"
								tabindex="-1"
								role="presentation"
								inert
							>
								<svelte:component this={node.default} id={node.id} inFlow={false} />
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<style lang="postcss">
	::-webkit-scrollbar {
		width: 0 !important;
	}
</style>
