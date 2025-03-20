import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TaskType } from '@/enums/task-type';
import { taskMenuList } from '@/lib/workflows/menu/task-menu';
import { TaskRegistry } from '@/lib/workflows/task/registry';

export const TaskMenu = () => {
  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={[taskMenuList[0].title]}>
        {taskMenuList.map((menu, idx) => (
          <AccordionItem
            value={menu.title}
            key={idx}>
            <AccordionTrigger className="font-bold border-b mb-3">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{menu.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-wrap gap-2">
              {menu.tasks.map((task, idx) => (
                <TaskMenuButton
                  key={idx}
                  taskType={task.type}
                  description={task.description}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};

const TaskMenuButton = ({
  taskType,
  description,
}: {
  taskType: TaskType;
  description: string;
}) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="mb-2 p-2 border rounded-md hover:border-white cursor-pointer w-full"
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-secondary rounded-xl flex items-center justify-center p-2">
          <task.icon />
        </div>
        <div>
          <div className="font-medium text-sm">{task.label}</div>
          <div className="text-xs text-muted-foreground truncate">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
