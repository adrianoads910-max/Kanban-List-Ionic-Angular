import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  @Input() task!: Task;

  @Output() edit = new EventEmitter<Task>();
  @Output() dragStarted = new EventEmitter<Task>();
  @Output() dragEnded = new EventEmitter<void>();

  dragStart(task: Task, event: DragEvent) {
    this.dragStarted.emit(task);
    event.dataTransfer?.setData('text/plain', task.id);
  }

  dragEnd(event: DragEvent) {
    this.dragEnded.emit();
  }
}
