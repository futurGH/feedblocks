<script lang="ts">
	import { type Node, type Edge, useNodes, useEdges } from "@xyflow/svelte";
	import { debounce } from "$lib/util";
	import equal from "fast-deep-equal/es6";

	const MAX_HISTORY_LENGTH = 100;

	let updating = false;

	type HistoryState = {
		nodes: Array<Node>;
		edges: Array<Edge>;
	};

	let currentState: HistoryState = { nodes: [], edges: [] };

	let pastState: Array<HistoryState> = [];
	let futureState: Array<HistoryState> = [];

	const nodes = useNodes();
	const edges = useEdges();

	// Whenever nodes or edges are updated, we take a snapshot of the current state,
	// updating currentState and moving the previous currentState to pastState
	function snapshot(newNodes?: Array<Node>, newEdges?: Array<Edge>) {
		// If the update was triggered by undo/redo, don't snapshot
		if (updating) return (updating = false);
		newNodes ??= $nodes;
		newEdges ??= $edges;
		const newState = { nodes: [...newNodes], edges: [...newEdges] };
		// If currentState is empty, it's the first snapshot, so the new state should go to currentState, and
		// pastState should be empty because there's nothing to undo
		if (!currentState.nodes.length) {
			currentState = newState;
			return;
		}
		if (
			currentState.nodes.length === newState.nodes.length &&
			currentState.edges.length === newState.edges.length &&
			equal(currentState, newState)
		)
			return;
		if (equal(currentState, pastState[pastState.length - 1])) return;
		pastState.push(currentState);
		if (pastState.length > MAX_HISTORY_LENGTH) {
			pastState.shift();
		}
		currentState = newState;
		futureState = [];
		updating = false;
	}

	const debouncedSnapshot = debounce(
		(nodes?: Array<Node>, edges?: Array<Edge>) => snapshot(nodes, edges),
		200
	);
	nodes.subscribe((n) => {
		if (updating) return;
		debouncedSnapshot(n);
	});
	edges.subscribe((e) => debouncedSnapshot(undefined, e));

	function undo() {
		const previousState = pastState.pop();
		if (!previousState) return;
		futureState.push({ nodes: $nodes, edges: $edges });
		updating = true;
		nodes.set(previousState.nodes);
		edges.set(previousState.edges);
	}

	function redo() {
		const nextState = futureState.pop();
		if (!nextState) return;
		pastState.push({ nodes: $nodes, edges: $edges });
		updating = true;
		nodes.set(nextState.nodes);
		edges.set(nextState.edges);
	}

	// Using a keydown handler instead of @svelte-put/shortcut because it emits both ctrl+z and ctrl+shift+z
	// when shift is pressed
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			if (e.shiftKey) {
				redo();
			} else {
				undo();
			}
		}
		if (e.key === "y" && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			redo();
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />
<slot />
