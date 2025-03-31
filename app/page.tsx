import { MarketingPageFooter } from '@/components/shared/marketing-page-footer';
import { MarketingPageHeader } from '@/components/shared/marketing-page-header';

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
        <MarketingPageFooter />
      </div>
    </div>
  );
}
