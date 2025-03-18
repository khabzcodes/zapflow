import { NodeProps } from '@xyflow/react';
import { memo } from 'react';
import { NodeCard } from '../custom-node.tsx/node-card';
import { AppNodeData } from '@/types/app-node';
import { TaskRegistry } from '@/lib/workflows/task/registry';
import { NodeHeader } from '../custom-node.tsx/node-header';
import { NodeInput, NodeInputs } from '../custom-node.tsx/node-inputs';
import { NodeOutput, NodeOutputs } from '../custom-node.tsx/node-outputs';
import { GmailTriggerConfiguration } from './configuration';

const GmailTriggerNode = memo((props: NodeProps) => {
  const data = props.data as AppNodeData;
  const task = TaskRegistry[data.type];
  return (
    <NodeCard
      nodeId={props.id}
      selected={props.selected}>
      <NodeHeader
        nodeId={props.id}
        taskType={data.type}
      />
      <GmailTriggerConfiguration />
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

export default GmailTriggerNode;
GmailTriggerNode.displayName = 'GmailTriggerNode';
