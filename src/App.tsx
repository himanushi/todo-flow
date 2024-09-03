import {
	Background,
	BackgroundVariant,
	type Connection,
	Controls,
	type Edge,
	MiniMap,
	type Node,
	ReactFlow,
	addEdge,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import { useCallback } from "react";
import "@xyflow/react/dist/style.css";

const PromptNode = () => {
	return <>aaa</>;
};

const initialNodes: Node[] = [
	{ id: "prompt", position: { x: 100, y: 100 }, data: {}, type: "prompt" },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
	prompt: PromptNode,
};

export default function App() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(
		(params: Connection) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
			>
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
}
