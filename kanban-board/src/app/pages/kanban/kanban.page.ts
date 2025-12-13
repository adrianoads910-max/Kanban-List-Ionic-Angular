import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

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
export class KanbanPage implements OnInit, OnDestroy {

  tasks: Task[] = [];
  private tasksSubscription!: Subscription;

  columns = [
    { title: 'Aberto',       status: 'aberto' },
    { title: 'Em Andamento', status: 'em-andamento' },
    { title: 'Concluído',    status: 'concluido' },
    { title: 'Done Done',    status: 'done-done' },
  ] as const;

  draggingTask: Task | null = null;

  private taskService = inject(TaskService);
  private modalCtrl = inject(ModalController);

  ngOnInit() {
    this.tasksSubscription = this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy() {
    this.tasksSubscription?.unsubscribe();
  }

  getTasksByStatus(status: Task['status']) {
    return this.tasks.filter(t => t.status === status);
  }

  trackByStatus(_: number, col: { status: string }) {
    return col.status;
  }

  async openTaskForm(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskFormPage,
      componentProps: task ? { task } : {}
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      if (task?.id) {
        this.taskService.update(task.id, data);
      } else {
        this.taskService.add(data);
      }
    }
  }

  onDragStart(task: Task) {
    this.draggingTask = task;
  }

  onDrop(toStatus: Task['status']) {
    if (!this.draggingTask?.id) return;

    this.taskService.update(this.draggingTask.id, { status: toStatus });
    this.draggingTask = null;
  }

  onDeleteTask(task: Task) {
    if (task.id) {
      this.taskService.delete(task.id);
    }
  }
}
