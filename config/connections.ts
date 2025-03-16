import { Connection } from '@/types/connection';

export const connections: Connection[] = [
  {
    icon: '/connections/sheets.png',
    displayName: 'Google Sheets',
    name: 'google-sheets',
    description: 'Configure your Google Sheets to sync or create data.',
    link: '/api/server/connections/connect/google-sheet',
    categories: ['Google', 'Data Storage'],
  },
  {
    icon: '/connections/gmail.png',
    displayName: 'Gmail',
    name: 'gmail',
    description: 'Configure your Gmail to sync or create emails.',
    link: '/api/server/connections/connect/gmail',
    categories: ['Google', 'Email'],
  },
  {
    icon: '/connections/google-calendar.png',
    displayName: 'Google Calendar',
    name: 'google-calendar',
    description: 'Configure your Google calendar to sync or create events.',
    link: '/api/server/connections/connect/google-calendar',
    categories: ['Google', 'Calendar'],
  },
  {
    icon: '/connections/google-forms.png',
    displayName: 'Google Forms',
    name: 'google-forms',
    description: 'Configure your Google Forms to sync or create forms.',
    link: '/api/server/connections/connect/google-forms',
    categories: ['Google', 'Forms'],
  },
  {
    icon: '/connections/slack.png',
    displayName: 'Slack',
    name: 'slack',
    description: 'Configure your Slack to sync or create messages.',
    link: '/api/server/connections/connect/slack',
    categories: ['Communication', 'Slack'],
  },
  {
    icon: '/connections/ms-teams.png',
    displayName: 'Microsoft Teams',
    name: 'microsoft-teams',
    description: 'Configure your Microsoft Teams to sync or create messages.',
    link: '/api/server/connections/connect/microsoft-teams',
    categories: ['Communication', 'Microsoft'],
  },
];
