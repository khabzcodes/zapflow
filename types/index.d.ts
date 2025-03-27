import { AppNode } from './app-node';
import { Edge as AppEdge } from '@xyflow/react';

declare global {
  type Node = AppNode;
  type Edge = AppEdge;
}
