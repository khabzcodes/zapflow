import type { NodeProps } from '@xyflow/react';
import { memo } from 'react';
import { NodeCard } from './node-card';
import { NodeHeader } from './node-header';
import { AppNodeData } from '@/types/app-node';
import { TaskRegistry } from '@/lib/workflows/task/registry';
import { NodeInput, NodeInputs } from './node-inputs';
import { NodeOutput, NodeOutputs } from './node-outputs';

const CustomNode = memo((props: NodeProps) => {
  const data = props.data as AppNodeData;
  const task = TaskRegistry[data.type];
  return (
    <NodeCard
      nodeId={props.id}
      selected={props.selected}>
      <NodeHeader taskType={data.type} />
      <NodeInputs>
        {task.inputs.map((input, idx) => (
          <NodeInput
            key={idx}
            input={input}
            nodeId={props.id}
          />
        ))}
      </NodeInputs>
      <NodeOutputs>
        {task.outputs.map((output, idx) => (
          <NodeOutput
            key={idx}
            output={output}
          />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default CustomNode;
CustomNode.displayName = 'CustomNode';
