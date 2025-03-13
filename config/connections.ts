import { Connection } from '@/types/connection';

export const connections: Connection[] = [
  {
    icon: '/connections/sheets.png',
    displayName: 'Google Sheets',
    name: 'google-sheets',
    description: 'Configure your Google Sheets to sync or create data.',
    link: '/api/server/connections/connect/google-sheet',
  },
  {
    icon: '/connections/google-calendar.png',
    displayName: 'Google Calendar',
    name: 'google-calendar',
    description: 'Configure your Google calendar to sync or create events.',
    link: '/api/server/connections/connect/google-calendar',
  },
  {
    icon: '/connections/google-forms.png',
    displayName: 'Google Forms',
    name: 'google-forms',
    description: 'Configure your Google Forms to sync or create forms.',
    link: '/api/server/connections/connect/google-forms',
  },
];
