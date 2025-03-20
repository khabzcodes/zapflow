import {
  FlowToExecutionPlan,
  FlowToExecutionPlanValidationError,
} from '@/lib/workflows/execution-plan';
import { AppNode } from '@/types/app-node';
import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';
import { useFlowValidation } from './use-flow-validation';
import { toast } from 'sonner';

export const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => {
      switch (error.type) {
        case FlowToExecutionPlanValidationError.NoEntryPoints:
          toast.error('No entry points found');
          setInvalidInputs(error.invalidInputs);
          break;
        case FlowToExecutionPlanValidationError.InvalidInputs:
          toast.error('Invalid inputs found');
          setInvalidInputs(error.invalidInputs);
          break;
        default:
          toast.error('An unknown error occurred');
          break;
      }
    },
    [setInvalidInputs],
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();

    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges,
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();

    return executionPlan;
  }, [clearErrors, handleError, toObject]);

  return generateExecutionPlan;
};
