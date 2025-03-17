import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ParamProps } from '@/types/tasks';
import React from 'react';
import { useId } from 'react';

export const StringParam = ({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) => {
  const [internalValue, setInternalValue] = React.useState(value || '');
  const id = useId();
  return (
    <div className="space-y-1 p-1 w-full">
      <Label
        htmlFor={id}
        className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        className="text-xs border-1 border-muted-foreground"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className="text-xs text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
};
