export interface TodoItemDto {
  id: number | string;
  task: string;
  date: Date;
  place: string;
  animation: string;
  order_in_date: number;
  completed_in_progress: string;
}

export type Action =
  | { type: "init"; data: TodoItemDto[] }
  | { type: "new" }
  | { type: "delete"; id: number | string }
  | { type: "modify"; id: number | string; data: Partial<TodoItemDto> };
