import { Injectable } from '@angular/core';
import { MOCK_TODOS } from '../mocks/mock-data';
import { Todo } from '../models/todo.models';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  async getTodos() {
    await sleep(1000);
    return MOCK_TODOS;
  }

  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    await sleep(1000);

    return {
      ...todo,
      id: Date.now().toString(),
    } as Todo;
  }

  async deleteTodo(id: string): Promise<void> {
    await sleep(500);
  }
}
