import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useReactFlow } from '@xyflow/react';
import { useRouter } from 'next/navigation';

type TopNavProps = {
  title: string;
  description: string;
};
export const TopNav = ({ title, description }: TopNavProps) => {
  const router = useRouter();
  const { toObject } = useReactFlow();
  return (
    <div className="flex p-2 border-b border-separate justify-between items-center w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1">
        <Icons.arrowLeft
          className="cursor-pointer"
          onClick={() => router.push('/app/workflows')}
        />
        <p className="font-bold">Workflow Editor</p>
      </div>
      <div className="text-center">
        <p className="font-bold">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline">
          <Icons.play />
          Execute
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            console.log(toObject());
          }}>
          <Icons.save />
          Save
        </Button>
      </div>
    </div>
  );
};
