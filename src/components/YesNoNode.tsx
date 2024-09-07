import { useState, useEffect } from "react";
import { t2t } from "./t2t";

export const YesNoNode = ({ setNodes }: { setNodes: any }) => {
	const [response, setResponse] = useState("");

	useEffect(() => {
		const fetchResponse = async () => {
			try {
				const result = await t2t("Please provide a yes or no response.");
				setResponse(result);
			} catch (error) {
				console.error("Error fetching response:", error);
			}
		};

		fetchResponse();
	}, []);

	return (
		<div className="flex w-52 flex-col items-center justify-center gap-2 rounded-lg border-2 border-gray-900 bg-blue-300 p-3">
			<p>{response || "Loading response..."}</p>
			<button
				type="button"
				className="rounded-lg border-2 border-gray-900 bg-green-500 px-3 transition-all duration-150 active:translate-y-1"
				onClick={() => {
					const newNode = {
						id: `node-${Date.now()}`,
						position: { x: Math.random() * 400, y: Math.random() * 400 },
						data: {},
						type: "yesno",
					};
					setNodes((nds: any) => [...nds, newNode]);
				}}
			>
				Yes
			</button>
			<button
				type="button"
				className="rounded-lg border-2 border-gray-900 bg-red-500 px-3 transition-all duration-150 active:translate-y-1"
				onClick={() => {
					const newNode = {
						id: `node-${Date.now()}`,
						position: { x: Math.random() * 400, y: Math.random() * 400 },
						data: {},
						type: "yesno",
					};
					setNodes((nds: any) => [...nds, newNode]);
				}}
			>
				No
			</button>
		</div>
	);
};
