'use client';
import { Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { QueryClientProviderWrapper } from '@/lib/query-client';
import { TooltipProvider } from '@/components/ui/tooltip';

const geistMono = Geist_Mono({ subsets: ['latin'] });

export const GlobalLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body
        className={`${geistMono.className} antialiased`}
        suppressHydrationWarning>
        <QueryClientProviderWrapper>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryClientProviderWrapper>
        <Toaster />
      </body>
    </html>
  );
};
