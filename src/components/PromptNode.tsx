import type { Edge, Node, NodeProps } from "@xyflow/react";
import { type Dispatch, type SetStateAction, useId, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { t2t } from "./t2t";

export const PromptNode = (props: NodeProps<Node<{ prompts: string[] }>>) => {
	const prompts = props.data.prompts ?? [];
	const [prompt, setPrompt] = useState(prompts[0] ?? "");

	return (
		<div className="flex w-52 flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-900 bg-teal-300 p-3">
			<TextareaAutosize
				className="w-full resize-none rounded-lg border-2 border-gray-900 px-3 py-2"
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
							const newPrompt = await t2t(prompt);

							const newNode = {
								id: crypto.randomUUID(),
								position: { x: Math.random() * 400, y: Math.random() * 400 },
								data: { prompts: [...prompts, prompt, newPrompt] },
								type: "prompt",
							};

							// setNodes((nds: Node[]) => [...nds, newNode]);
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
	);
};
