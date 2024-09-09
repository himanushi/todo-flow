import {
	type Edge,
	Handle,
	type Node,
	type NodeProps,
	Position,
} from "@xyflow/react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useFlow } from "./FlowContext";
import { t2t } from "./t2t";

export const PromptNode = (props: NodeProps<Node<{ prompts: string[] }>>) => {
	const prompts = props.data.prompts ?? [];
	const [prompt, setPrompt] = useState(prompts[prompts.length - 1] ?? "");
	console.log("PromptNode", props);

	const { setNodes, setEdges } = useFlow();

	return (
		<>
			<div className="flex w-52 flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-900 bg-teal-300 p-3">
				<TextareaAutosize
					className="w-full resize-none rounded-lg border-2 border-gray-900 px-3 py-2 text-xs"
					maxRows={5}
					minRows={2}
					onChange={(e) => {
						setPrompt(e.target.value);
					}}
					value={prompt}
				/>
				<button
					type="button"
					className={
						"rounded-lg border-2 border-gray-900 bg-rose-500 px-3 transition-all duration-150 active:translate-y-1"
					}
					onClick={() => {
						const createYesNoNodes = async () => {
							try {
								// const newPrompt = await t2t(prompt);
								const newPrompt =
									"あなたは、このプロンプトに対して、どのように反応しますか？";

								const newNode = {
									id: crypto.randomUUID(),
									position: { x: Math.random() * 400, y: Math.random() * 400 },
									data: { prompts: [...prompts, prompt, newPrompt] },
									type: "prompt",
								};
								setNodes((nds) => [...nds, newNode]);

								const newEdge: Edge = {
									id: crypto.randomUUID(),
									source: props.id,
									sourceHandle: "1",
									target: newNode.id,
									targetHandle: "2",
								};
								setEdges((eds) => [...eds, newEdge]);
							} catch (error) {
								console.error("Error creating PromptNodes:", error);
							}
						};

						createYesNoNodes();
					}}
				>
					やる
				</button>
			</div>
			<Handle
				type="source"
				position={Position.Top}
				id="1"
				isConnectable={true}
			/>
			<Handle
				type="source"
				position={Position.Right}
				id="2"
				isConnectable={true}
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				id="3"
				isConnectable={true}
			/>
			<Handle
				type="source"
				position={Position.Left}
				id="4"
				isConnectable={true}
			/>
		</>
	);
};
