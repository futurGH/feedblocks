<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	import { writable } from "svelte/store";
	import type { ZonedDateTime } from "@internationalized/date";

	export const inputs = [];
	export const outputs = [
		{
			connectorType: ConnectorType.Data,
			name: "output",
			description: "The date and time entered",
		},
	];
	export const newData = () => ({
		dateTime: writable<ZonedDateTime>(),
		outputType: () => "datetime",
	});
	export const title = "date and time";
	export const description = "Outputs a provided date and time";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import DateTimeInput from "$lib/components/elements/DateTimeInput.svelte";

	type $$Props = NodeProps;

	export let data = newData();
	let { dateTime } = data;
</script>

<BaseNode {title} {description} color="sky" showHandleNames={false} {inputs} {outputs} {...$$props}>
	<DateTimeInput
		slot="additional"
		class="w-44 justify-center gap-x-0.5 overflow-x-clip px-2"
		label="Date and time"
		hideLabel
		bind:value={dateTime}
	/>
</BaseNode>
