import { workflow } from '@/db/schemas/workflow';
import { TaskType } from '@/enums/task-type';
import { LucideProps } from 'lucide-react';
import React from 'react';
import { TaskParam } from './tasks';
import { AppNode } from './app-node';

export type Workflow = typeof workflow.$inferSelect;

export type WorkflowTask = {
  label: string;
  description: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  inputs: TaskParam[];
  outputs: TaskParam[];
};

export type WorkflowExecutionPlan = {
  phase: number;
  nodes: AppNode[];
}[];

export type WorkflowExecutionPlanPhase = WorkflowExecutionPlan[number];
