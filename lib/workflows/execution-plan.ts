import { AppNode, AppNodeMissingInputs } from '@/types/app-node';
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from '@/types/workflow';
import { getIncomers, type Edge } from '@xyflow/react';
import { TaskRegistry } from './task/registry';

export enum FlowToExecutionPlanValidationError {
  InvalidInputs = 'InvalidInputs',
  NoEntryPoints = 'NoEntryPoints',
}

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
  error?: {
    type: FlowToExecutionPlanValidationError;
    invalidInputs?: AppNodeMissingInputs[];
  };
};

export const FlowToExecutionPlan = (
  nodes: AppNode[],
  edges: Edge[],
): FlowToExecutionPlanType => {
  const targetNodeIds = new Set(edges.map((edge) => edge.target));
  const entryPoints = nodes.filter((node) => !targetNodeIds.has(node.id));
  if (!entryPoints.length) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.NoEntryPoints,
      },
    };
  }

  const inputsWithErrors: AppNodeMissingInputs[] = [];
  const planned = new Set<string>();
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: entryPoints,
    },
  ];

  for (const entryPoint of entryPoints) {
    // Validate entry point
    const invalidInputs = getInvalidInputs(entryPoint, edges, planned);
    console.log(invalidInputs);
    if (invalidInputs.length > 0) {
      inputsWithErrors.push({
        nodeId: entryPoint.id,
        inputs: invalidInputs,
      });
    } else {
      planned.add(entryPoint.id);
    }
  }

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        continue;
      }

      const invalidInputs = getInvalidInputs(currentNode, edges, planned);
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          inputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          });
        } else {
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
      planned.add(currentNode.id);
    }
    executionPlan.push(nextPhase);
  }

  if (inputsWithErrors.length > 0) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.InvalidInputs,
        invalidInputs: inputsWithErrors,
      },
    };
  }

  return { executionPlan };
};

const getInvalidInputs = (
  node: AppNode,
  edges: Edge[],
  planned: Set<string>,
) => {
  const invalidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;

    if (inputValueProvided) {
      continue;
    }
    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name,
    );

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);
    if (requiredInputProvidedByVisitedOutput) {
      continue;
    } else if (!input.required) {
      if (!inputLinkedToOutput) {
        continue;
      }
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        continue;
      }
    }

    invalidInputs.push(input.name);
  }

  return invalidInputs;
};
