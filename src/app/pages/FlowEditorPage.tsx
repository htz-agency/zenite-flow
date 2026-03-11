import { ReactFlowProvider } from 'reactflow';
import FlowBuilder from '../components/flow-canvas/FlowBuilder';

interface FlowEditorPageProps {
  flowId?: string;
}

export default function FlowEditorPage({ flowId }: FlowEditorPageProps) {
  return (
    <ReactFlowProvider>
      <div className="w-full h-screen">
        <FlowBuilder flowId={flowId} />
      </div>
    </ReactFlowProvider>
  );
}
