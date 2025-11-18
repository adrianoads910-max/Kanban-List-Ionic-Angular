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
  tasksSubscription!: Subscription; // Para gerenciar a memória

  columns = [
    { title: 'Aberto',        status: 'aberto' },
    { title: 'Em Andamento',  status: 'em-andamento' },
    { title: 'Concluído',     status: 'concluido' },
    { title: 'Done Done',     status: 'done-done' },
  ] as const;

  draggingTask: Task | null = null;

  // Injeção moderna
  private taskService = inject(TaskService);
  private modalCtrl = inject(ModalController);

  constructor() {}

  // 🔥 INICIALIZAÇÃO: Conecta ao fluxo de dados do Firebase
  ngOnInit() {
    // Aqui nos inscrevemos. Sempre que o banco mudar (add, edit, move, delete),
    // 'this.tasks' atualiza automaticamente e a tela redesenha.
    this.tasksSubscription = this.taskService.getAll().subscribe((firestoreTasks) => {
      this.tasks = firestoreTasks;
    });
  }

  // Boa prática: Se sair da página, para de ouvir o banco
  ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  // FILTRA AS TAREFAS POR COLUNA (Igual ao seu anterior)
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
      if (task && task.id) {
        // Editar: Apenas chame o update. Não precisa recarregar a lista manual.
        this.taskService.update(task.id, data);
      } else {
        // Criar
        this.taskService.add(data);
      }
     
    }
  }

  // QUANDO COMEÇA A ARRASTAR
  onDragStart(task: Task) {
    this.draggingTask = task;
  }

  // QUANDO SOLTA NA COLUNA
  onDrop(toStatus: Task['status']) {
    if (!this.draggingTask || !this.draggingTask.id) return;

    // Apenas avisa o firebase que mudou o status.
    // Em milissegundos, o Firebase avisa o subscribe, que atualiza a tela.
    this.taskService.update(this.draggingTask.id, { status: toStatus });
    
    this.draggingTask = null;
  }

  // APAGAR TAREFA
  onDeleteTask(task: Task) {
    if(task.id) {
      this.taskService.delete(task.id);
    }
  }
}