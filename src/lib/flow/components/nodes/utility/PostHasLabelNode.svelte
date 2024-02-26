<script lang="ts" context="module">
	import BaseNode, { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";
	export const inputs = [
		{
			connectorType: ConnectorType.Data,
			name: "post",
			type: "post",
			description: "The post to check for labels",
		},
	];
	export const outputs = [
		{
			connectorType: ConnectorType.Condition,
			name: "result",
			type: "boolean",
			description: "Whether the post has the specified label",
		},
	];
	export const newData = () => ({ label: writable<string>() });
	export const title = "post has label";
	export const description = "Outputs whether the provided post has the specified label";
</script>

<script lang="ts">
	import type { NodeProps } from "@xyflow/svelte";
	import { type Writable, writable } from "svelte/store";
	import Combobox, { type ComboboxItem } from "$lib/components/elements/Combobox.svelte";

	type $$Props = NodeProps;

	export let data = newData();
	let { label } = data;

	const postLabels = [
		{ label: "any label", value: "any" },
		{ label: "any sexual", value: "sexual:any" },
		{ label: "sexual: porn", value: "sexual:porn" },
		{ label: "sexual: sexual", value: "sexual:sexual" },
		{ label: "sexual: nudity", value: "sexual: nudity" },
		{ label: "any violence", value: "violence:any" },
		{ label: "violence: nsfl", value: "violence:nsfl" },
		{ label: "violence: corpse", value: "violence:corpse" },
		{ label: "violence: gore", value: "violence:gore" },
		{ label: "violence: torture", value: "violence:torture" },
		{ label: "violence: self-harm", value: "violence:self-harm" },
		{ label: "any intolerance", value: "intolerance:any" },
		{ label: "intolerance: race", value: "intolerance:intolerant-race" },
		{ label: "intolerance: gender", value: "intolerance:intolerant-gender" },
		{
			label: "intolerance: sexual orientation",
			value: "intolerance:intolerant-sexual-orientation",
		},
		{ label: "intolerance: religion", value: "intolerance:intolerant-religion" },
		{ label: "intolerance: intolerant", value: "intolerance:intolerant" },
		{ label: "intolerance: icon", value: "intolerance:icon-intolerant" },
		{ label: "any misinfo", value: "misinfo:any" },
		{ label: "misinfo: security", value: "misinfo:account-security" },
		{ label: "misinfo: net-abuse", value: "misinfo:net-abuse" },
		{ label: "misinfo: impersonation", value: "misinfo:impersonation" },
		{ label: "misinfo: scam", value: "misinfo:scam" },
		{ label: "misinfo: misleading", value: "misinfo:misleading" },
		{ label: "threat", value: "rude:threat" },
		{ label: "spoiler", value: "curation:spoiler" },
		{ label: "spam", value: "spam:spam" },
	];

	let selected: Writable<ComboboxItem> = writable(postLabels[0]);
	$: label.set($selected.value);
</script>

<BaseNode {title} {description} color="indigo" {inputs} {outputs} {...$$props}>
	<Combobox
		slot="additional"
		bind:selected
		options={postLabels}
		label="Select a post label"
		hideLabel
		inFlow
	/>
</BaseNode>
