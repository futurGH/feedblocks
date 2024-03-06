import { useHandleConnections, useNodesData } from "@xyflow/svelte";
import { get } from "svelte/store";

export function resolveInputTypes(nodeId: string) {
	const connections = get(useHandleConnections({ nodeId, type: "target" }));
	return connections.reduce<Record<string, string>>((acc, conn) => {
		if (!conn.targetHandle) return acc;
		const sourceNodeData = get(useNodesData(conn.source));
		if (
			!sourceNodeData ||
			!sourceNodeData.outputType ||
			typeof sourceNodeData.outputType !== "function"
		)
			return acc;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		acc[conn.targetHandle] = sourceNodeData.outputType();
		return acc;
	}, {});
}
