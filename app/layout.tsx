import type { Metadata } from 'next';
import './globals.css';
import { GlobalLayout } from '@/components/layouts/global-layout';

export const metadata: Metadata = {
  title:
    "Zapflow :: Workflow automation tool designed to streamline repetitive tasks, improve efficiency, and enhance collaboration. Whether you're automating business processes, integrating apps, or optimizing task management, ZapFlow helps you get more done with less effort",
  description:
    "Workflow automation tool designed to streamline repetitive tasks, improve efficiency, and enhance collaboration. Whether you're automating business processes, integrating apps, or optimizing task management, ZapFlow helps you get more done with less effort",
  authors: {
    name: 'Ndivhuwo Khabubu',
    url: 'https://x.com/khabubundivhu',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GlobalLayout>{children}</GlobalLayout>;
}
