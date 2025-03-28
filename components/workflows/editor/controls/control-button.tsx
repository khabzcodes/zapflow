import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

type ControlButtonProps = Readonly<ComponentPropsWithoutRef<'button'>>;

export const ControlButton = ({
  children,
  className,
  ...props
}: ControlButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'border-none flex disabled:(pointer-events-none op-30 cursor-not-allowed) items-center justify-center bg-transparent size-7 text-light-50 rounded-md transition active:(bg-dark-200) hover:bg-dark-300 cursor-pointer',
        className,
      )}
      {...props}>
      {children}
    </button>
  );
};
