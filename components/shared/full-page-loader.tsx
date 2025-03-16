import { Icons } from '@/components/ui/icons';

export const FullPageLoader = () => {
  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl flex items-center justify-center">
      <Icons.spinner className="animate-spin h-6 w-6" />
    </div>
  );
};
