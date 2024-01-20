export interface TodoItemDto {
  id: number | string;
  task: string;
  date: Date;
  place: string;
  animation: string;
  order_in_date: number;
  completed_in_progress: string;
}
