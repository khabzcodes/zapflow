import {
  Controls,
  type ReactFlowState,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import { shallow } from 'zustand/shallow';
import { CustomControlButton } from './custom-control-button';
import { Fullscreen, Minus, Plus } from 'lucide-react';

const ZOOM_DURATION = 500;

function selector(s: ReactFlowState) {
  return {
    minZoomReached: s.transform[2] <= s.minZoom,
    maxZoomReached: s.transform[2] >= s.maxZoom,
  };
}

export const CustomControls = () => {
  const { maxZoomReached, minZoomReached } = useStore(selector, shallow);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Controls
      className="bg-black p-1"
      showFitView={false}
      showZoom={false}
      showInteractive={false}
      position="bottom-left">
      <CustomControlButton
        onClick={() => zoomIn({ duration: ZOOM_DURATION })}
        disabled={maxZoomReached}>
        <Plus />
      </CustomControlButton>

      <CustomControlButton
        onClick={() => zoomOut({ duration: ZOOM_DURATION })}
        disabled={minZoomReached}>
        <Minus />
      </CustomControlButton>

      <CustomControlButton onClick={() => fitView({ duration: ZOOM_DURATION })}>
        <Fullscreen />
      </CustomControlButton>
    </Controls>
  );
};
