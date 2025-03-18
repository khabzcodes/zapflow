import CustomNode from '@/components/nodes/custom-node.tsx';
import GmailTriggerNode from '@/components/nodes/gmail-trigger';
import { TaskType } from '@/enums/task-type';

export const nodeTypeMap: { [key in TaskType]?: string } = {
  [TaskType.GMAIL_TRIGGER]: 'GmailTriggerNode',
};

export const nodeTypes = {
  ZapflowNode: CustomNode,
  GmailTriggerNode: GmailTriggerNode,
};
