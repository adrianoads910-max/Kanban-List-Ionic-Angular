import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { KanbanColumnComponent } from 'src/app/components/kanban-column/kanban-column.component';
import { TaskService } from 'src/app/services/task.service';
import { TaskFormPage } from '../task-form/task-form.page';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    KanbanColumnComponent
  ],
  templateUrl: './kanban.page.html',
  styleUrls: ['./kanban.page.scss']
})
export class KanbanPage {

  tasks: Task[] = [];

  columns = [
    { title: 'Aberto', status: 'aberto' },
    { title: 'Em Andamento', status: 'em-andamento' },
    { title: 'Concluído', status: 'concluido' },
    { title: 'Done Done', status: 'done-done' },
  ] as const;

  draggingTask: Task | null = null;

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.tasks = this.taskService.getAll();
  }

  getTasksByStatus(status: Task['status']) {
    return this.tasks.filter(t => t.status === status);
  }

  // Abrir modal (criar ou editar)
  async openTaskForm(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskFormPage,
      componentProps: task ? { task } : {}
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      if (task) {
        this.taskService.update(task.id, data);
      } else {
        this.taskService.add(data);
      }

      this.tasks = this.taskService.getAll();
    }
  }

  // 🌟 DRAG — começa arrastar
  onDragStart(task: Task) {
    this.draggingTask = task;
  }

  // 🌟 DROP — recebe o status vindo do evento (dropped)="onDrop($event)"
  onDrop(toStatus: Task['status']) {
    if (!this.draggingTask) return;

    this.taskService.update(this.draggingTask.id, { status: toStatus });
    this.tasks = this.taskService.getAll();

    this.draggingTask = null;
  }
}
