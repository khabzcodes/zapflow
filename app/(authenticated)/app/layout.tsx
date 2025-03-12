import { AppSidebar } from '@/components/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

type AppLayoutProps = React.PropsWithChildren;

export default async function AppLayout({ children }: AppLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && !session?.session.activeOrganizationId) {
    await auth.api.setActiveOrganization({
      headers: await headers(),
      body: {
        organizationId: session?.user.id,
      },
    });
  }

  if (!session) {
    return;
  }

  return (
    <SidebarProvider>
      <AppSidebar
        user={{
          id: session.user.id,
          name: session.user.name,
          image: session.user.image || null,
          email: session?.user.email,
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4"
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
