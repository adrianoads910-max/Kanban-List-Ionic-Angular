import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { KanbanColumnComponent } from 'src/app/components/kanban-column/kanban-column.component';
import { TaskService } from 'src/app/services/task.service';
import { TaskFormPage } from '../task-form/task-form.page';
import { Task } from 'src/app/models/task'

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    KanbanColumnComponent,
  ],
  templateUrl: './kanban.page.html',
  styleUrls: ['./kanban.page.scss']
})
export class KanbanPage {

  tasks: Task [] = [];

  columns = [
    { title: 'Aberto', status: 'aberto' },
    { title: 'Em Andamento', status: 'em-andamento' },
    { title: 'Concluído', status: 'concluido' },
    { title: 'Done Done', status: 'done-done' },
  ];

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.tasks = this.taskService.getAll();
  }

  getTasksByStatus(status: string) {
    return this.tasks.filter(t => t.status === status);
  }

  async openCreateModal() {
    const modal = await this.modalCtrl.create({
      component: TaskFormPage
    });

    await modal.present();

    modal.onDidDismiss().then(() => {
      this.tasks = this.taskService.getAll();
    });
  }
}
