export enum ModuleType {
  Start = 'start',
  Trigger = 'trigger',
  Action = 'action',
  Condition = 'condition',
  End = 'end',
}

export type Module = {
  label: string;
  description: string;
  type: ModuleType;
};
