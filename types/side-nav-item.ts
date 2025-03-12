import { Icons } from '@/components/ui/icons';

export interface SideNavItem {
  title: string;
  url: string;
  icon: keyof typeof Icons;
}
