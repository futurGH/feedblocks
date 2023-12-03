import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: Array<ClassValue>) => twMerge(clsx(...args));

export const alphabet = "abcdefghijklmnopqrstuvwxyz";
