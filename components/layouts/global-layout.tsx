'use client';
import { Space_Grotesk } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { QueryClientProviderWrapper } from '@/lib/query-client';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from 'next-themes';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange={false}>
          <QueryClientProviderWrapper>
            <TooltipProvider>{children}</TooltipProvider>
          </QueryClientProviderWrapper>
          <Toaster
            richColors
            className="rounded-none"
            expand={true}
          />
        </ThemeProvider>
      </body>
    </html>
  );
};
