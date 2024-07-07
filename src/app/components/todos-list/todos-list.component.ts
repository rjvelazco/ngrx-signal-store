import { Component, effect, ElementRef, inject, viewChild, ViewChild } from '@angular/core';
import { NgStyle } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { TodosStore } from '../../store/todo.store';
import { TodosFilter } from '../../models/todo.models';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    NgStyle,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.css',
})
export class TodosListComponent {

  filterButton = viewChild.required(MatButtonToggleGroup);
  input = viewChild.required<ElementRef>('input');
  
  store = inject(TodosStore);

  constructor() {
    effect(() => {
      const filterBtn = this.filterButton();
      filterBtn.value = this.store.filter();
    })
  }

  async onAddTodo(title: string) {
    await this.store.addTodo(title);
    this.input().nativeElement.value = ''; // Better use a form control
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onUpdateTodo(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);
    console.log('Todo updated');
  }

  async onFilterTodos({ value }: MatButtonToggleChange) {
    this.store.updateFilter(value as TodosFilter);
  }
}
