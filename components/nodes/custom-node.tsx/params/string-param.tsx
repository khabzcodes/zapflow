import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

  const renderInput = () => {
    switch (param?.variant) {
      case 'textarea':
        return (
          <Textarea
            id={id}
            disabled={disabled}
            className="text-xs border-1 border-muted-foreground"
            value={internalValue}
            onChange={(e) => setInternalValue(e.target.value)}
            onBlur={(e) => updateNodeParamValue(e.target.value)}
          />
        );
      case 'select':
        return (
          <Select
            value={internalValue}
            defaultValue={param?.options[0]?.value}
            onValueChange={(value) => updateNodeParamValue(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {param?.options.map(
                (option: { value: string; label: string }) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}>
                    {option.label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            id={id}
            disabled={disabled}
            className="text-xs border-1 border-muted-foreground"
            value={internalValue}
            onChange={(e) => setInternalValue(e.target.value)}
            onBlur={(e) => updateNodeParamValue(e.target.value)}
          />
        );
    }
  };
  return (
    <div className="space-y-1 p-1 w-full">
      <Label
        htmlFor={id}
        className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-500">*</span>}
      </Label>
      {renderInput()}
      {param.helperText && (
        <p className="text-xs text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
};
