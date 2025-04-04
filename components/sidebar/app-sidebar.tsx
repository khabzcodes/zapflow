'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { sidebarMainMenu, sidebarOrganizationMenu } from '@/config/side-nav';
import { Icons } from '../ui/icons';
import React from 'react';
import { OrganizationSwitcher } from './organization-switcher';
import { useActiveOrganization, useListOrganizations } from '@/lib/auth-client';
import { Skeleton } from '../ui/skeleton';
import { UserNav } from './user-nav';
import { usePathname, useRouter } from 'next/navigation';

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    id: string;
    name: string | null;
    image: string | null;
    email: string;
  };
};

export const AppSidebar = ({ user, ...props }: AppSidebarProps) => {
  const { data: activeOrganization, isPending: loadingActiveOrganization } =
    useActiveOrganization();
  const { data: organizations, isPending: loadingOrganizations } =
    useListOrganizations();

  const pathName = usePathname();
  const { replace } = useRouter();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {loadingActiveOrganization || loadingOrganizations ? (
          <Skeleton className="h-14 w-full" />
        ) : (
          <OrganizationSwitcher
            activeOrganization={{
              id: activeOrganization?.id || '',
              name: activeOrganization?.name || '',
              plan: 'free',
            }}
            organizations={
              organizations?.map((organization) => ({
                id: organization.id,
                name: organization.name,
              })) || []
            }
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu className="gap gap-3">
            {sidebarMainMenu.map((item, idx) => {
              const Icon = Icons[item.icon];
              return (
                <SidebarMenuItem
                  onClick={() => replace(item.url)}
                  key={idx}
                  className={
                    pathName.includes(item.title.toLowerCase())
                      ? 'bg-accent-foreground/25 text-black rounded-sm cursor-pointer'
                      : 'cursor-pointer'
                  }>
                  <SidebarMenuButton>
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarOrganizationMenu.map((item) => {
              const Icon = Icons[item.icon];
              return (
                <SidebarMenuItem
                  onClick={() => replace(item.url)}
                  key={item.title}
                  className={
                    pathName.includes(item.title.toLowerCase())
                      ? 'bg-accent-foreground/25 text-black rounded-sm cursor-pointer'
                      : 'cursor-pointer'
                  }>
                  <SidebarMenuButton>
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="flex items-center gap-2">
          <UserNav
            user={{
              id: user.id,
              name: user.name,
              image: user.image || null,
              email: user.email,
            }}
          />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
