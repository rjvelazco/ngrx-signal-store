import { computed, inject } from "@angular/core";

import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

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
            },

            async updateTodo(id: string, completed: boolean) {
                
                // Optimistic update
                patchState(store, (state) => ({
                    ...state,
                    todos: state.todos.map((todo) => {
                        if (todo.id === id) {
                            return { ...todo, completed };
                        }

                        return todo;
                    })
                }));

                await todosServices.deleteTodo(id);
            },

            updateFilter(filter: TodosFilter) {
                patchState(store, { filter });
            }
        })
    ),
    withComputed((state) => ({
        filteredTodos: computed(() => {
            const todos = state.todos();
            switch (state.filter()) {
                case 'all':
                    return todos;
                case 'completed':
                    return todos.filter((todo: Todo) => todo.completed);
                case 'pending':
                    return todos.filter((todo: Todo) => !todo.completed);
            }
        })
    }))
);
