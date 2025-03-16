import type { Node } from '@xyflow/react';

export type TriggerNodeData = Node<{
  onTrigger(id: string): void;
  label: string;
  description: string;
  id: string;
}>;
