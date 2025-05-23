import { ChartConfiguration, ChartTypeRegistry, Plugin } from 'chart.js';

// Corrected ChartType interface
export interface ChartType {
  data?: ChartConfiguration['data'];
  options?: ChartConfiguration['options'];
  plugins?: Plugin<keyof ChartTypeRegistry, Object>[];
  type?: ChartConfiguration['type'];
}
