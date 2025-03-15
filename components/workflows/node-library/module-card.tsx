import Image from 'next/image';
import { Module } from '@/types/module';

export const ModuleCard = ({
  module,
  appIcon,
  onSelect,
}: {
  module: Module;
  appIcon: string;
  onSelect: (app: Module) => void;
}) => {
  return (
    <div
      className="border flex pl-2 pt-2 flex-col md:flex-row justify-between items-start md:items-center hover:border-white transition-colors duration-200"
      onClick={() => onSelect(module)}>
      <div className="flex">
        <div className="w-12 h-12 relative">
          <Image
            src={appIcon || '/placeholder.svg'}
            alt={module.label}
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="font-sm text-base">{module.label}</h3>
          <p className="text-xs text-gray-500">{module.description}</p>
        </div>
      </div>
    </div>
  );
};
