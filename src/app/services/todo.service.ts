import { Injectable } from "@angular/core";
import { MOCK_TODOS } from "../mocks/mock-data";

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable({
    providedIn: 'root'
})
export class TodosService {

    async getTodos() {
        await sleep(1000);
        return MOCK_TODOS;
    }
};
