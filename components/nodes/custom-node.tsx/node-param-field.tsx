import { TaskParamType } from '@/enums/task-param-types';
import { TaskParam } from '@/types/tasks';
import { StringParam } from './params/string-param';
import { useReactFlow } from '@xyflow/react';
import { AppNode } from '@/types/app-node';
import { useCallback } from 'react';
import { NumberParam } from './params/number-param';

export const NodeParamField = ({
  param,
  nodeId,
  disabled,
}: {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        ...node.data,
        inputs: {
          ...node.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [node.data, updateNodeData, nodeId, param.name],
  );
  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={(newValue: string) => {
            updateNodeParamValue(newValue);
          }}
          disabled={disabled}
        />
      );
    case TaskParamType.NUMBER:
      return (
        <NumberParam
          param={param}
          value={value}
          updateNodeParamValue={(newValue: string) => {
            updateNodeParamValue(newValue);
          }}
          disabled={disabled}
        />
      );
    default:
      return (
        <div className="w-full">
          <p>Not Implemented</p>
        </div>
      );
  }
};
