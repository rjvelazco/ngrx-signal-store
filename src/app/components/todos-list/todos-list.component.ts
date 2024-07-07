import { Component, ElementRef, inject, ViewChild } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { TodosStore } from '../../store/todo.store';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
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
}
