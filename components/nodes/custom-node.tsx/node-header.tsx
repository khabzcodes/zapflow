import { useReactFlow } from '@xyflow/react';
import { Icons } from '@/components/ui/icons';
import { TaskType } from '@/enums/task-type';
import { TaskRegistry } from '@/lib/workflows/task/registry';
import Image from 'next/image';

type NodeHeaderProps = {
  nodeId: string;
  taskType: TaskType;
};

export const NodeHeader = ({ nodeId, taskType }: NodeHeaderProps) => {
  const { deleteElements } = useReactFlow();
  const task = TaskRegistry[taskType];

  const handleDelete = () => {
    deleteElements({ nodes: [{ id: nodeId }] });
  };

  return (
    <div className="gap-2 p-2 space-y-2">
      <div className="flex items-center">
        <Image
          src={task.icon}
          width={16}
          height={16}
          alt={task.label}
        />
        <div className="flex justify-between items-center w-full">
          <p className="text-xs font-bold uppercase text-muted-foreground">
            {task.label}
          </p>
          <div className="flex items-center justify-end">
            <Icons.delete
              className="cursor-pointer size-4"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{task.description}</p>
    </div>
  );
};
