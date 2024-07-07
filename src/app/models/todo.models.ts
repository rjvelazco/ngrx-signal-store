export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

export type TodosFilter = 'all' | 'pending' | 'completed';
