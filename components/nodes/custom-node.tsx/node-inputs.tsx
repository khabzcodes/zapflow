import { cn } from '@/lib/utils';
import { TaskParam } from '@/types/tasks';
import { Handle, Position, useEdges } from '@xyflow/react';
import { NodeParamField } from './node-param-field';

type NodeInputsProps = {
  readonly children: React.ReactNode;
};

export const NodeInputs = ({ children }: NodeInputsProps) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) => {
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name,
  );
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField
        param={input}
        nodeId={nodeId}
        disabled={isConnected}
      />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            '!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4',
          )}
        />
      )}
    </div>
  );
};
