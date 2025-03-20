'use client';
import { Space_Grotesk } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { QueryClientProviderWrapper } from '@/lib/query-client';
import { TooltipProvider } from '@/components/ui/tooltip';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const GlobalLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.className} antialiased`}
        suppressHydrationWarning>
        <QueryClientProviderWrapper>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryClientProviderWrapper>
        <Toaster
          richColors
          className="rounded-none"
          expand={true}
        />
      </body>
    </html>
  );
};
