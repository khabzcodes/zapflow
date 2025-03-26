import { Icons } from '@/components/ui/icons';
import { useRouter } from 'next/navigation';
import { SaveButton } from './save-button';
import { ExecuteButton } from './execute-button';

type TopNavProps = {
  workflowId: string;
  title: string;
  description: string;
  hideButtons?: boolean;
};
export const TopNav = ({
  workflowId,
  title,
  description,
  hideButtons,
}: TopNavProps) => {
  const router = useRouter();
  return (
    <div className="flex p-2 border-b border-separate justify-between items-center w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1">
        <Icons.arrowLeft
          className="cursor-pointer"
          onClick={() => router.push('/app/workflows')}
        />
        <div className="flex flex-col">
          <p className="font-bold">{title}</p>
          <p className="text-xs text-muted-foreground truncate">
            {description}
          </p>
        </div>
      </div>
      {!hideButtons && (
        <div className="flex gap-2">
          <SaveButton workflowId={workflowId} />
          <ExecuteButton workflowId={workflowId} />
        </div>
      )}
      <section className="flex h-full overflow-auto"></section>
    </div>
  );
};
