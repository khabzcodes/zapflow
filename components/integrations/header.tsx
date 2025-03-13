import { Input } from '@/components/ui/input';
import { Icons } from '../ui/icons';

export const IntegrationsHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Integrations</h1>
      <div className="relative">
        <Icons.search className="absolute w-4 h-4 top-1/2 -translate-y-1/2 left-2 text-gray-400" />
        <Input
          placeholder="Search integrations"
          className="w-72 pl-9"
        />
      </div>
    </div>
  );
};
