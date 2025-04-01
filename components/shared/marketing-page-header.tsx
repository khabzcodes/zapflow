'use client';
import Link from 'next/link';
import { MainNav } from './main-nav';
import { ThemeSwitcher } from './theme-switcher';
import { cn } from '@/lib/utils';
import { Icons } from '../ui/icons';
import { buttonVariants } from '../ui/button';
import { useSession } from '@/lib/auth-client';

export const MarketingPageHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <nav className="flex items-center gap-0.5">
              {!session ? (
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'sm' }),
                  )}>
                  Get Started
                </Link>
              ) : (
                <Link
                  href="/app"
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'sm' }),
                  )}>
                  Dashboard
                </Link>
              )}
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  'size-8 px-0',
                )}>
                <Icons.github className="size-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <ThemeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
