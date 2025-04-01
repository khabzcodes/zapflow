import { GridPattern } from '@/components/shared/grid-pattern';
import { MarketingPageFooter } from '@/components/shared/marketing-page-footer';
import { MarketingPageHeader } from '@/components/shared/marketing-page-header';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex min-h-svh flex-col bg-background overflow-hidden">
      <div className="border-grid flex flex-1 flex-col">
        <MarketingPageHeader />
        <div className="relative grid h-full flex-1 place-items-center overflow-hidden">
          <div className="z-10 flex flex-col items-center space-y-6">
            <div className="space-y-1 text-center">
              <h1 className="max-w-2xl text-2xl font-bold text-muted-foreground">
                Streamline tasks, integrate seamlessly, and scale
                effortlessly—no code required. Focus on what matters while our
                intelligent automation handles the rest.
              </h1>
            </div>
            <Link
              href="/waiting-list"
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
              )}>
              Join waiting list
            </Link>
          </div>
        </div>
        <GridPattern
          squares={[
            [5, 12],
            [6, 16],
            [3, 20],
            [8, 23],
            [2, 25],
            [15, 15],
            [17, 16],
            [20, 20],
            [13, 20],
            [25, 25],
            [16, 27],
          ]}
          className={cn(
            '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
            '-inset-y-1/2 inset-x-0 h-[200%] skew-y-12',
          )}
        />
        <MarketingPageFooter />
      </div>
    </div>
  );
}
