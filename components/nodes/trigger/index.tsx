import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { PlayCircle } from 'lucide-react';

type TriggerNode = Node<{
  onTrigger(id: string): void;
  label: string;
  description: string;
  id: string;
}>;

export interface TriggerNodeData extends TriggerNode {
  onTrigger: (id: string) => void;
}

export const TriggerNode = ({
  data,
  isConnectable,
}: NodeProps<TriggerNode>) => {
  const handleTrigger = () => {
    if (data.onTrigger) {
      data.onTrigger(data.id);
    }
  };
  return (
    <Card className="border-2 border-primary min-w-[180px] shadow-md">
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-primary" />
            <span className="font-medium">{data.label}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 hover:bg-primary hover:text-primary-foreground"
            onClick={handleTrigger}>
            Trigger
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">{data.description}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary border-2 border-background"
      />
    </Card>
  );
};
