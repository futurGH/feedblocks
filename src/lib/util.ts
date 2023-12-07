import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
