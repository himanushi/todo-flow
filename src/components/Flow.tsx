import {
	Background,
	BackgroundVariant,
	Controls,
	type Edge,
	MiniMap,
	type Node,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { PromptNode } from "./PromptNode";
import { Settings } from "./Settings";

const initialNodes: Node[] = [
	{
		id: "prompt",
		position: {
			x: window.innerWidth / 2 - 104,
			y: window.innerHeight / 2 - 100,
		},
		data: {},
		type: "prompt",
	},
];
const initialEdges: Edge[] = [];

export const Flow = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				nodeTypes={{
					prompt: PromptNode({ setNodes, setEdges }),
				}}
			>
				<Settings />
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
};
