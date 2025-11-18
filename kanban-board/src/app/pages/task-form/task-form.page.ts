import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonInput, IonTextarea, ModalController
} from '@ionic/angular/standalone';

import { Task, Subtask } from 'src/app/models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonTextarea
  ],
})
export class TaskFormPage {

  @Input() task?: Task;

  /**  
   * O formulário NÃO deve ter id.
   * O TaskService.add() gera um id automaticamente.
   */
  form: Omit<Task, 'id'> = {
    title: '',
    description: '',
    status: 'aberto',
    priority: 'baixa',
    dueDate: '',
    subtasks: [],
    createdAt: undefined,
    updatedAt: undefined
  };

  newSubtaskLabel = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.task) {
      // remove o ID antes de clonar, para evitar conflitos
      const { id, ...resto } = this.task;
      this.form = structuredClone(resto);
    }
  }

  // ➕ Adicionar subtarefa
  addSubtask() {
    const label = this.newSubtaskLabel.trim();
    if (!label) return;

    this.form.subtasks.push({ label, done: false });
    this.newSubtaskLabel = '';
  }

  // ❌ Remover subtarefa
  removeSubtask(sub: Subtask) {
    this.form.subtasks = this.form.subtasks.filter(s => s !== sub);
  }

  // Fechar modal
  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  // Salvar tarefa (criação ou edição)
  saveTask() {
    this.modalCtrl.dismiss(this.form, 'confirm');
  }
}
