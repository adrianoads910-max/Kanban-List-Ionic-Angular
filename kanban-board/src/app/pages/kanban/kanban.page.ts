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
    { title: 'Aberto',        status: 'aberto' },
    { title: 'Em Andamento',  status: 'em-andamento' },
    { title: 'Concluído',     status: 'concluido' },
    { title: 'Done Done',     status: 'done-done' },
  ] as const;

  draggingTask: Task | null = null;

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController
  ) {}

  // CARREGA AO ENTRAR NA PÁGINA
  ionViewWillEnter() {
    this.tasks = this.taskService.getAll();
  }

  // FILTRA AS TAREFAS POR COLUNA
  getTasksByStatus(status: Task['status']) {
    return this.tasks.filter(t => t.status === status);
  }

  // ABRIR MODAL (CRIAR OU EDITAR)
  async openTaskForm(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskFormPage,
      componentProps: task ? { task } : {}
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      if (task) {
        // Editar
        this.taskService.update(task.id, data);
      } else {
        // Criar
        this.taskService.add(data);
      }

      this.tasks = this.taskService.getAll();
    }
  }

  // QUANDO COMEÇA A ARRASTAR
  onDragStart(task: Task) {
    this.draggingTask = task;
  }

  // QUANDO SOLTA NA COLUNA
  onDrop(toStatus: Task['status']) {
    if (!this.draggingTask) return;

    this.taskService.update(this.draggingTask.id, { status: toStatus });
    this.tasks = this.taskService.getAll();

    this.draggingTask = null;
  }

  // ------------- 🔥 NOVO MÉTODO: APAGAR TAREFA -------------
  onDeleteTask(task: Task) {
    this.taskService.delete(task.id);       // remove do storage
    this.tasks = this.taskService.getAll(); // recarrega lista atualizada
  }
}
