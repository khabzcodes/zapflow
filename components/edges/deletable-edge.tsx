import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useReactFlow,
  type EdgeProps,
} from '@xyflow/react';
import { Icons } from '../ui/icons';

export const DeletableEdge = (props: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}>
          <Icons.cancelCircle
            className="bg-background cursor-pointer h-6 w-6"
            onClick={() => {
              setEdges((edg) => edg.filter((edg) => edg.id !== props.id));
            }}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
