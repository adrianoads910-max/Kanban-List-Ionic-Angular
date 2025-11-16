import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
  imports: [
    TaskCardComponent, 
  ],
})
export class KanbanColumnComponent {

  @Input() title!: string;
  @Input() status!: string;
  @Input() tasks: Task[] = [];

}
