import { SideNavItem } from '@/types/side-nav-item';

export const sidebarMainMenu: SideNavItem[] = [
  {
    title: 'Dashboard',
    url: '/app',
    icon: 'home',
  },
  {
    title: 'Workflows',
    url: '/app/workflows',
    icon: 'nodeMoveUp',
  },
  {
    title: 'Connections',
    url: '/app/connections',
    icon: 'plugSocket',
  },
];

export const sidebarOrganizationMenu: SideNavItem[] = [
  {
    title: 'Members',
    url: '/app/members',
    icon: 'users',
  },
  {
    title: 'Invitations',
    url: '/app/invitations',
    icon: 'addTeam',
  },
];
