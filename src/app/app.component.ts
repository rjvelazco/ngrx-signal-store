import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';

import { TodosStore } from './store/todo.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
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
