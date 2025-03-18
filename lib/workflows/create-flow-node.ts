import { nodeTypeMap } from '@/config/node-type-mapper';
import { TaskType } from '@/enums/task-type';
import { AppNode } from '@/types/app-node';
import { nanoid } from 'nanoid';

export const createFlowNode = (
  nodeType: TaskType,
  position?: { x: number; y: number },
): AppNode => {
  return {
    id: nanoid(),
    type: nodeTypeMap[nodeType] || 'ZapflowNode',
    dragHandle: '.drag-handle',
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position || { x: 0, y: 0 },
  };
};
