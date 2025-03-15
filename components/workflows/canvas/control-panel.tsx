import { Panel } from '@xyflow/react';
import { NodeLibrary } from '../node-library';
import { applicationsConfig } from '@/config/applications';
import { Module } from '@/types/module';

type ControlPanelProps = {
  onAddModule: (module: Module) => void;
};

export const ControlPanel = ({ onAddModule }: ControlPanelProps) => {
  return (
    <Panel position="top-right">
      <div className="flex gap-2">
        <NodeLibrary
          applications={applicationsConfig}
          onClick={onAddModule}
        />
      </div>
    </Panel>
  );
};
