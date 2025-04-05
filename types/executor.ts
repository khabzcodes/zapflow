import { WorkflowTask } from './workflow';

export type PhaseConfiguration = {
  phases: Record<
    string,
    {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    }
  >;
};

export type ExecutionPhaseConfiguration<T extends WorkflowTask> = {
  getInput(name: T['inputs'][number]['name']): string;
};
