import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';

type WorkflowsHeaderProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const WorkflowsHeader = ({
  isOpen,
  setIsOpen,
}: WorkflowsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Workflows</h1>
        <p className="text-muted-foreground">
          Manage your automation workflows
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Icons.search className="absolute w-4 h-4 top-1/2 -translate-y-1/2 left-2 text-gray-400" />
          <Input
            placeholder="Search workflows"
            className="w-72 pl-9"
          />
        </div>
        <Button
          size="sm"
          onClick={() => setIsOpen(!isOpen)}>
          <Icons.plusSquare />
          Create new workflow
        </Button>
      </div>
    </div>
  );
};
