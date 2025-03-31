import { LucideProps } from 'lucide-react';
import { JSX } from 'react';

export interface ConnectionInput {
  name: string;
  label: string;
  type: string;
  required: boolean;
  variant: 'input' | 'select';
  options?: string[];
  value: string;
}

export interface Connection {
  icon: (props: LucideProps) => JSX.Element;
  displayName: string;
  name: string;
  description: string;
  link?: string;
  categories: string[];
  type: 'credentials' | 'oauth2';
  inputs?: ConnectionInput[];
}
