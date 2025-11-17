import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
  imports: [
    CommonModule,
    TaskCardComponent
  ],
})
export class KanbanColumnComponent {

  @Input() title!: string;
  @Input() status!: Task['status'];
  @Input() tasks: Task[] = [];

  // 🔧 Evento para editar tarefa
  @Output() editTask = new EventEmitter<Task>();

  // 🔥 Envia status da coluna onde caiu o drop
  @Output() dropped = new EventEmitter<Task['status']>();

  // 🔥 Envia qual tarefa começou a ser arrastada
  @Output() startDrag = new EventEmitter<Task>();

  // Permite arrastar por cima
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Quando solta uma tarefa na coluna
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dropped.emit(this.status);
  }
}
