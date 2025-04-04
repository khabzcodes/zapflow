import { cn } from '@/lib/utils';
import { TaskParam } from '@/types/tasks';
import { Handle, Position } from '@xyflow/react';
import { ReactNode } from 'react';

export const NodeOutputs = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col divide-y gap-1">{children}</div>;
};

export const NodeOutput = ({ output }: { output: TaskParam }) => {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          '!bg-muted-foreground !border-2 !border-background !-right-1 !w-4 !h-4',
        )}
      />
    </div>
  );
};
