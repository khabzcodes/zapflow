/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TaskParam {
  name: string;
  type: string;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  [key: string]: any;
}

export interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
}
