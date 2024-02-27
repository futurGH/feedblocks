import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NodeProps } from "@xyflow/svelte";
import { allNodes } from "$lib/flow/components/nodes";
import { createId } from "@paralleldrive/cuid2";

export const cn = (...args: Array<ClassValue>) => twMerge(clsx(...args));

export function debounce<T extends (...args: never[]) => unknown>(
	fn: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	return (...args) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), wait);
	};
}

export const makeHandleId = ({
	title: nodeTitle,
	id: nodeId,
	name: handleName,
}: {
	title: string;
	id: string;
	name: string;
}) => `${nodeTitle}-${nodeId}-${handleName}`.replace(/[^a-zA-Z0-9-]/g, `_`);

export const parseHandleId = (handleId?: string | null) => {
	if (!handleId) return null;
	const [type, id, name] = handleId.split("-");
	return name ? { type, id, name } : null;
};

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
		data: allNodes[props.type as keyof typeof allNodes]?.newData?.() || {},
	};
}

export const typesMatch = (a: string | undefined | null, b: string | undefined | null) =>
	a === b || a === "any" || b === "any";
