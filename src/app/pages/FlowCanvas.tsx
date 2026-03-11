import { ReactFlowProvider } from 'reactflow';
import { useParams } from 'react-router';
import FlowBuilder from '../components/flow-canvas/FlowBuilder';

export function FlowCanvas() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactFlowProvider>
        <FlowBuilder flowId={id} />
      </ReactFlowProvider>
    </div>
  );
}