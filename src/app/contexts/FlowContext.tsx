import { createContext, useContext } from 'react';

interface FlowContextType {
  onNodeDoubleClick?: (nodeId: string) => void;
}

export const FlowContext = createContext<FlowContextType>({});

export const useFlowContext = () => useContext(FlowContext);
