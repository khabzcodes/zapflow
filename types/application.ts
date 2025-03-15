import { Module } from './module';

export type Application = {
  icon: string;
  displayName: string;
  name: string;
  modules: Module[];
};
