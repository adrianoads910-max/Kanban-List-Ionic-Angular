import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonInput, IonTextarea, ModalController
} from '@ionic/angular/standalone';

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

  @Input() task?: any;

  form = {
    title: '',
    description: '',
    status: 'aberto',
    priority: 'baixa',
    dueDate: '',
    subtasks: []
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.task) {
      this.form = { ...this.task };  // preenche o form para edição
    }
  }

  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  saveTask() {
    this.modalCtrl.dismiss(this.form, 'confirm');
  }
}
