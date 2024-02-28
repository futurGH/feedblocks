import type { ConnectorType } from "$lib/flow/components/nodes/BaseNode.svelte";

export type InputOutput = {
	connectorType: ConnectorType;
	name: string;
	description: string;
};
