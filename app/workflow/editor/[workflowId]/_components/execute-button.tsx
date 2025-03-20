import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useExecutionPlan } from '@/hooks/workflows/use-execution-plan';

export const ExecuteButton = () => {
  const generate = useExecutionPlan();
  return (
    <Button
      onClick={() => {
        const plan = generate();
        console.log('---Plan---');
        console.table(plan);
      }}
      size="sm"
      variant="outline">
      <Icons.play />
      Execute
    </Button>
  );
};
