import { Application } from '@/types/application';
import { ModuleType } from '@/types/module';

export const applicationsConfig: Application[] = [
  {
    icon: '/connections/sheets.png',
    displayName: 'Google Sheets',
    name: 'google-sheets',
    modules: [
      {
        label: 'Create a new spreadsheet',
        description: 'Creates a new spreadsheet',
        type: ModuleType.Action,
      },
      {
        label: 'Create a spreadsheet from template',
        description: 'Creates a new spreadsheet from a template',
        type: ModuleType.Action,
      },
      {
        label: 'Watch new rows',
        description: 'Triggers when a new row is added in a spreadsheet.',
        type: ModuleType.Trigger,
      },
      {
        label: 'Add a row',
        description: 'Appends a new row to the bottom of a spreadsheet.',
        type: ModuleType.Action,
      },
    ],
  },
  {
    icon: '/connections/google-calendar.png',
    displayName: 'Google Calendar',
    name: 'google-calendar',
    modules: [
      {
        label: 'Create an event',
        description: 'Creates a new event',
        type: ModuleType.Action,
      },
      {
        label: 'Update an event',
        description: 'Updates an event',
        type: ModuleType.Action,
      },
      {
        label: 'Delete an event',
        description: 'Deletes an event',
        type: ModuleType.Action,
      },
      {
        label: 'Watch new events',
        description: 'Triggers when a new event is added',
        type: ModuleType.Trigger,
      },
      {
        label: 'Get an event',
        description: 'Returns metadata from an event',
        type: ModuleType.Condition,
      },
    ],
  },
];
