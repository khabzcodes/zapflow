import { PropsWithChildren } from 'react';

type PageHeaderProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export const PageHeader = ({
  title,
  description,
  children,
}: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};
