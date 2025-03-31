import { ZapIcon } from 'lucide-react';
import Link from 'next/link';

export const MainNav = () => {
  return (
    <div className="ml-4 hidden md:flex">
      <Link
        href="/"
        className="mr-4 flex items-center gap-1 lg:mr-6">
        <div className="w-8 h-8 bg-accent-foreground rounded-sm flex items-center justify-center p-2 dark:bg-secondary">
          <ZapIcon className="size-5 rotate-45 text-white dark:text-white" />
        </div>
        <span className="hidden font-bold lg:inline-block">apflow</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6"></nav>
    </div>
  );
};
