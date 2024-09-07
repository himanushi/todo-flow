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
import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";
import "@xyflow/react/dist/style.css";
import type { JSX } from "react/jsx-runtime";
import { PromptNode } from "./PromptNode";
import { Settings } from "./Settings";

const initialEdges: Edge[] = [];

const nodeTypes = (setNodes: Dispatch<SetStateAction<Node[]>>) => ({
	prompt: (props: JSX.IntrinsicAttributes & { setNodes: any }) => (
		<PromptNode {...props} setNodes={setNodes} />
	),
});

export const Flow = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
	const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		setScreenSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, []);

	useEffect(() => {
		const initialNodes: Node[] = [
			{
				id: "prompt",
				position: {
					x: screenSize.width / 2 - 104,
					y: screenSize.height / 2 - 100,
				},
				data: {},
				type: "prompt",
			},
		];
		setNodes(initialNodes);
	}, [screenSize, setNodes]);

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
				nodeTypes={nodeTypes(setNodes)}
			>
				<Settings />
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
};
