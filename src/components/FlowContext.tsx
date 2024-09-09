import type { Edge, Node } from "@xyflow/react";
import type React from "react";
import { createContext, useContext } from "react";

interface FlowContextType {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider: React.FC<{
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  children: React.ReactNode;
}> = ({ setNodes, setEdges, children }) => {
  return (
    <FlowContext.Provider value={{ setNodes, setEdges }}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return context;
};
