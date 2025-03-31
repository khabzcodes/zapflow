import { GridPattern } from '@/components/shared/grid-pattern';
import { MarketingPageFooter } from '@/components/shared/marketing-page-footer';
import { MarketingPageHeader } from '@/components/shared/marketing-page-header';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <div className="border-grid flex flex-1 flex-col">
        <MarketingPageHeader />
        <div className="relative grid h-full flex-1 place-items-center overflow-hidden">
          <div className="z-10 flex flex-col items-center space-y-6">
            <div className="space-y-1 text-center"></div>
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
