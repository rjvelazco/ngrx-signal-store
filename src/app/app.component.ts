import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { TodosStore } from './store/todo.store';

import { TodosListComponent } from './components/todos-list/todos-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, MatProgressSpinnerModule, TodosListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'signal-store';

  store = inject(TodosStore);

  ngOnInit(): void {
    this.loadTodos()
      .then(() => console.log('Todos loaded'));
  };

  async loadTodos() {
    await this.store.loadAll();
  }

}
