import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
  imports: [TaskCardComponent],
})
export class KanbanColumnComponent {

  @Input() title!: string;
  @Input() status!: Task['status'];
  @Input() tasks: Task[] = [];

  @Output() editTask = new EventEmitter<Task>();

  // 🔥 IMPORTANTE: tipar como status, não Event
  @Output() dropped = new EventEmitter<Task['status']>();

  @Output() startDrag = new EventEmitter<Task>();

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dropped.emit(this.status);   // 👈 manda o status para o kanban.page
  }
}
