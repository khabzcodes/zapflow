import { Icons } from '@/components/ui/icons';
import { Connection } from '@/types/connection';
import { LucideProps } from 'lucide-react';

export const connectionConfig: Connection[] = [
  {
    icon: (props: LucideProps) => <Icons.googleSheets {...props} />,
    displayName: 'Google Sheets',
    name: 'google-sheets',
    description: 'Configure your Google Sheets to sync or create data.',
    link: '/api/server/connections/connect/google-sheet',
    categories: ['Google', 'Data Storage'],
    type: 'oauth2',
  },
  {
    icon: (props: LucideProps) => <Icons.gmail {...props} />,
    displayName: 'Gmail',
    name: 'gmail',
    description: 'Configure your Gmail to sync or create emails.',
    link: '/api/server/connections/connect/gmail',
    categories: ['Google', 'Email'],
    type: 'oauth2',
  },
  {
    icon: (props: LucideProps) => <Icons.openai {...props} />,
    displayName: 'OpenAI',
    name: 'openai',
    description: 'Configure your OpenAI to generate text.',
    categories: ['AI', 'Text Generation'],
    type: 'credentials',
    inputs: [
      {
        name: 'apiKey',
        label: 'Open API Key',
        type: 'text',
        required: true,
        variant: 'input',
        value: '',
      },
    ],
  },
];
