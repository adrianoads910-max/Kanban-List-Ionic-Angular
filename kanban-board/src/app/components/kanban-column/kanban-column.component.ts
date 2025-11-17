import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
  imports: [
    CommonModule,
    FormsModule,       
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

  // ================================
  // 🔍 FILTROS DA COLUNA
  // ================================
  filterTitle: string = '';
  filterPriority: 'todas' | 'baixa' | 'media' | 'alta' = 'todas';

  // Lista filtrada de tarefas
  get filteredTasks(): Task[] {
    return this.tasks.filter(task => {
      const matchTitle = task.title.toLowerCase().includes(this.filterTitle.toLowerCase());
      const matchPriority =
        this.filterPriority === 'todas' || this.filterPriority === task.priority;

      return matchTitle && matchPriority;
    });
  }

  // ================================
  // 🔥 DRAG & DROP
  // ================================
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dropped.emit(this.status);
  }
}
