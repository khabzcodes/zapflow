import { Button } from '@/components/ui/button';

type CanvasHeaderProps = {
  workflowName: string;
};

export const CanvasHeader = ({ workflowName }: CanvasHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6 border-b pb-4">
      <h1 className="text-2xl">{workflowName}</h1>
      <div className="flex items-center gap-4">
        <div>Last saved 2 mins ago</div>
        <Button size="sm">Save</Button>
        <Button size="sm">Publish</Button>
      </div>
    </div>
  );
};
