export interface Order {
  id: number;
  status: string;
  customer: string;
  order_id: string;
  total: number;
  created_date: string;
}

export type FilterType = "all" | "ongoing" | "completed" | "cancelled";

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface DateFilter {
  mode: "last7days" | "custom";
  range?: DateRange;
}
