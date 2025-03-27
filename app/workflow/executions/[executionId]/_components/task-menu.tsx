import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { TaskRegistry } from '@/lib/workflows/task/registry';
import { IWorkflowExecutionWithPhase } from '@/types/workflow-execution';
import moment from 'moment';

type ExecutionTaskMenuProps = {
  execution: IWorkflowExecutionWithPhase;
  onSelectPhase: (phaseId: string) => void;
};

export const ExecutionTaskMenu = ({
  execution,
  onSelectPhase,
}: ExecutionTaskMenuProps) => {
  return (
    <div className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <div className="space-y-4">
        <div className="space-y-4 text-xs">
          <p className="text-xl font-bold">Details</p>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground gap-2">
              <Icons.dashLineCircle className="size-3" />
              <span>Status</span>
            </div>
            <p className="capitalize font-bold">{execution.status}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground gap-2">
              <Icons.timeSchedule className="size-3" />
              <span>Created at</span>
            </div>
            <p className="font-bold">
              {moment(execution.startedAt).startOf('seconds').fromNow()}
            </p>
          </div>
          {execution.completedAt && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-muted-foreground gap-2">
                <Icons.timeSchedule className="size-3" />
                <span>Completed at</span>
              </div>
              <p className="capitalize font-bold">
                {moment(execution.completedAt).startOf('seconds').fromNow()}
              </p>
            </div>
          )}
        </div>
        <div className="space-y-3 text-xs">
          <p className="text-xl font-bold">Flows</p>
          <Separator />
          {execution.phases.map((phase) => {
            const task = TaskRegistry[phase.node.data.type];
            return (
              <div
                onClick={() => onSelectPhase(phase.id)}
                key={phase.id}
                className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center text-muted-foreground gap-2">
                  <div className="w-8 h-8 bg-secondary rounded-xl flex items-center justify-center p-2">
                    <task.icon />
                  </div>
                  <span>{task.label}</span>
                </div>
                <p className="capitalize font-bold">{phase.status}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
