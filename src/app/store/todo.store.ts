import { inject } from "@angular/core";

import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

import { Todo, TodosFilter } from "../models/todo.models";
import { TodosService } from "../services/todo.service";

type TodosState = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
};

const initialState: TodosState = {
    todos: [],
    loading: false,
    filter: 'all',
};

export const TodosStore = signalStore(
    { providedIn: 'root'},
    // With the withState() function, we can define the initial state of the store.
    withState(initialState),
    // With the withMethods() function, we can define behaviors that will be used to update the state.
    withMethods(
        (store, todosServices = inject(TodosService)) => ({
            async loadAll() {
                patchState(store, { loading: true });

                const todos = await todosServices.getTodos();

                patchState(store, { todos, loading: false });
            },

            async addTodo(title: string) {
                const todo = await todosServices.addTodo({ title, completed: false });

                patchState(store, (state) => ({
                    ...state,
                    todos: [...state.todos, todo],
                }));

            },

            async deleteTodo(id:string) {
                await todosServices.deleteTodo(id);

                patchState(store, (state) => ({
                    ...state,
                    todos: state.todos.filter((todo) => todo.id !== id),
                }));
            }
        })
    )
);
