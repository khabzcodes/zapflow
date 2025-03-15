import { Button } from '@/components/ui/button';
import { Panel } from '@xyflow/react';

export const ControlPanel = () => {
  return (
    <Panel position="top-right">
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex items-center gap-1">
          Save
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="flex items-center gap-1">
          Publish
        </Button>
      </div>
    </Panel>
  );
};
