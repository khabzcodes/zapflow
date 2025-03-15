import { Card } from '@/components/ui/card';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

type ActionNode = Node<
  {
    label: string;
    description: string;
    triggered: boolean;
    triggeredAt?: string;
  },
  'number'
>;

export const ActionNode = ({ data, isConnectable }: NodeProps<ActionNode>) => {
  return (
    <Card className="border-2 border-muted min-w-[180px] shadow-md">
      <div className="p-3">
        <div className="font-medium mb-1">{data.label}</div>
        <div className="text-xs text-muted-foreground">{data.description}</div>
        {data.triggered && (
          <div className="mt-2 text-xs px-2 py-1 bg-primary/10 text-primary rounded-sm">
            Triggered at: {data.triggeredAt}
          </div>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        isConnectable={isConnectable}
        className="w-3 h-3 bg-muted-foreground border-2 border-background"
      />
    </Card>
  );
};
