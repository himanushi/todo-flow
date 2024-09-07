import type { Edge, Node } from "@xyflow/react";
import { type Dispatch, type SetStateAction, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { t2t } from "./t2t";

export const PromptNode =
	({
		setNodes,
		setEdges,
	}: {
		setNodes: Dispatch<SetStateAction<Node[]>>;
		setEdges: Dispatch<SetStateAction<Edge[]>>;
	}) =>
	() => {
		const [value, setValue] = useState("");

		return (
			<div className="flex w-52 flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-900 bg-teal-300 p-3">
				<TextareaAutosize
					className="w-full resize-none rounded-lg border-2 border-gray-900 px-3 py-2"
					maxRows={5}
					minRows={2}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					value={value}
				/>
				<button
					type="button"
					className={
						"rounded-lg border-2 border-gray-900 bg-rose-500 px-3 transition-all duration-150 active:translate-y-1"
					}
					onClick={() => {
						const createYesNoNodes = async () => {
							try {
								const responses = await Promise.all([
									t2t(value),
									t2t(value),
									t2t(value),
								]);

								const newNodes = responses.map((response, i) => ({
									id: `yesno-${Date.now()}-${i}`,
									position: { x: Math.random() * 400, y: Math.random() * 400 },
									data: { response },
									type: "yesno",
								}));

								setNodes((nds: any) => [...nds, ...newNodes]);
							} catch (error) {
								console.error("Error creating YesNoNodes:", error);
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
