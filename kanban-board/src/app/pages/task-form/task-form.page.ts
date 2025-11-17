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
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonInput, IonTextarea
  ],
})
export class TaskFormPage {

  @Input() task?: Task;

  // Estado inicial da tarefa
  form: Task = {
    id: '',
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
      this.form = structuredClone(this.task);

      // Evitar problemas com undefined no input date
      this.form.dueDate = this.task.dueDate ?? '';
    } else {
      // Criação nova — gerar id
      this.form.id = crypto.randomUUID();
      this.form.createdAt = new Date();
    }
  }

  addSubtask() {
    const label = this.newSubtaskLabel.trim();
    if (!label) return;

    this.form.subtasks.push({
      label,
      done: false
    });

    this.newSubtaskLabel = '';
  }

  removeSubtask(sub: Subtask) {
    this.form.subtasks = this.form.subtasks.filter(s => s !== sub);
  }

  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  saveTask() {
    this.form.updatedAt = new Date();
    this.modalCtrl.dismiss(this.form, 'confirm');
  }
}
