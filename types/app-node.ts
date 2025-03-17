/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskType } from '@/enums/task-type';
import { Node } from '@xyflow/react';

export interface AppNodeData {
  type: TaskType;
  [key: string]: any;
  inputs: Record<string, string>;
}

export interface AppNode extends Node {
  data: AppNodeData;
}
