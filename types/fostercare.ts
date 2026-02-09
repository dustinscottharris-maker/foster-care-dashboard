export interface FosterCareData {
  state: string;
  children_count: number;
  year?: number;
  state_abbr?: string;
}

export interface ChartData {
  states: FosterCareData[];
  total: number;
  lastUpdated?: string;
}
