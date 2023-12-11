import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NodeProps } from "@xyflow/svelte";
import { allNodes } from "$lib/flow/components/nodes";
import { createId } from "@paralleldrive/cuid2";

export const cn = (...args: Array<ClassValue>) => twMerge(clsx(...args));

export const makeHandleId = ({
	title: nodeTitle,
	id: nodeId,
	name: handleName,
}: {
	title: string;
	id: string;
	name: string;
}) => `${nodeTitle}-${nodeId}-${handleName}`.replace(/[^a-zA-Z0-9-]/g, `_`);

export function duplicateNode(props: NodeProps) {
	if (!props.type || !props.positionAbsolute) return;
	if (!(props.type in allNodes)) return;
	return {
		id: createId(),
		type: props.type,
		position: {
			x: props.positionAbsolute.x,
			y: props.positionAbsolute.y + 100,
		},
		// @ts-expect-error - optional chaining handles undefined node
		// eslint-disable-next-line
		data: allNodes[props.type as never]?.newData?.() || {},
	};
}
