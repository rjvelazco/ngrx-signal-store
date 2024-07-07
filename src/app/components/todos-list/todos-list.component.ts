import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgStyle } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { TodosStore } from '../../store/todo.store';

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

  @ViewChild('input') input!:ElementRef<HTMLInputElement> ;
  store = inject(TodosStore);

  async onAddTodo(title: string) {
    await this.store.addTodo(title);
    this.input.nativeElement.value = ''; // Better use a form control
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onUpdateTodo(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);
    console.log('Todo updated');
  }
}
