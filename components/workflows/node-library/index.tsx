'use client';
import { useState } from 'react';
import { Application } from '@/types/application';
import { ApplicationCard } from './application-card';
import { ModuleCard } from './module-card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Module } from '@/types/module';

type GroupedModules = {
  [key: string]: Module[];
};

export const NodeLibrary = ({
  applications,
  onClick,
}: {
  applications: Application[];
  onClick: (module: Module) => void;
}) => {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const handleAppSelect = (app: Application) => {
    setSelectedApp(app);
  };

  const groupModulesByType = (modules: Module[]): GroupedModules => {
    return modules.reduce((acc: GroupedModules, module) => {
      const type = module.type || 'Other';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(module);
      return acc;
    }, {});
  };

  const handleBack = () => {
    setSelectedApp(null);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Icons.plusCircle className="w-6 h-6 text-white" />
      </SheetTrigger>
      <SheetContent className="min-w-[600px]">
        <SheetHeader>
          <SheetTitle>
            {selectedApp ? (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={handleBack}>
                <Icons.arrowLeft />
                Back to Applications
              </div>
            ) : (
              'Applications'
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="p-4">
          {!selectedApp ? (
            <div className="space-y-2">
              <Input />
              {applications.map((app) => (
                <div key={app.name}>
                  <ApplicationCard
                    application={app}
                    onSelect={handleAppSelect}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <Input />
              {Object.entries(groupModulesByType(selectedApp.modules)).map(
                ([type, modules]) => (
                  <div
                    key={type}
                    className="space-y-2">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase">
                      {type}
                    </h3>
                    <div className="space-y-2">
                      {modules.map((module) => (
                        <ModuleCard
                          key={module.label}
                          module={module}
                          onSelect={onClick}
                          appIcon={selectedApp.icon}
                        />
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
