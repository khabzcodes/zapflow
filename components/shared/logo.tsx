import { ZapIcon } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="w-8 h-8 bg-accent-foreground rounded-sm flex items-center justify-center p-2 dark:bg-secondary">
      <ZapIcon className="size-5 rotate-45 text-white dark:text-white" />
    </div>
  );
};
