import { MarketingPageHeader } from '@/components/shared/marketing-page-header';

export default function Home() {
  return (
    <>
      <MarketingPageHeader />
      <div className="relative grid h-full flex-1 place-items-center overflow-hidden">
        <div className="z-10 flex flex-col items-center space-y-6">
          <div className="space-y-1 text-center"></div>
        </div>
      </div>
    </>
  );
}
