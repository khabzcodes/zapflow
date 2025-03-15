import Image from 'next/image';
import { Application } from '@/types/application';

export const ApplicationCard = ({
  application,
  onSelect,
}: {
  application: Application;
  onSelect: (app: Application) => void;
}) => {
  return (
    <div
      key={application.name}
      onClick={() => onSelect(application)}
      className="border flex pl-2 pt-2 flex-col md:flex-row justify-between items-start md:items-center hover:border-white transition-colors duration-200 cursor-pointer">
      <div className="flex">
        <div className="w-12 h-12 relative">
          <Image
            src={application.icon || '/placeholder.svg'}
            alt={application.name}
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="font-medium text-base">{application.displayName}</h3>
        </div>
      </div>
    </div>
  );
};
