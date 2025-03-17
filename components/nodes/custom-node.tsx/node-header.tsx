import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { TaskType } from '@/enums/task-type';
import { TaskRegistry } from '@/lib/workflows/task/registry';
import Image from 'next/image';

type NodeHeaderProps = {
  taskType: TaskType;
};

export const NodeHeader = ({ taskType }: NodeHeaderProps) => {
  const task = TaskRegistry[taskType];
  return (
    <div className="flex items-center gap-2 p-2">
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
        <Button
          variant="ghost"
          size="icon"
          className="drag-handle cursor-grab">
          <Icons.dragAndDropVertical />
        </Button>
      </div>
    </div>
  );
};
