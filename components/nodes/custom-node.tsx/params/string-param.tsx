import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ParamProps } from '@/types/tasks';
import React from 'react';
import { useId } from 'react';

export const StringParam = ({
  param,
  value,
  disabled,
  updateNodeParamValue,
}: ParamProps) => {
  const [internalValue, setInternalValue] = React.useState(value || '');
  const id = useId();

  React.useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Component: any = Input;
  if (param?.variant === 'textarea') {
    Component = Textarea;
  }
  return (
    <div className="space-y-1 p-1 w-full">
      <Label
        htmlFor={id}
        className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-500">*</span>}
      </Label>
      <Component
        id={id}
        disabled={disabled}
        className="text-xs border-1 border-muted-foreground"
        value={internalValue}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e: any) => setInternalValue(e.target.value)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className="text-xs text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
};
