export interface ITodoItem {
  content: string;
  id: string;
}

export function instanceOfTodoItem(object: any): object is ITodoItem {
  return 'content' in object;
}
