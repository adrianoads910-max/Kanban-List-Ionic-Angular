import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ionic Components
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    IonButton
  ]
})
export class TaskFormPage implements OnInit {

  // campos da tarefa
  task = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'media'
  };

  constructor() {}

  ngOnInit() {}

  save() {
    console.log('Tarefa salva:', this.task);

    // Aqui você pode enviar a tarefa para um service, modal, rota etc.
  }
}
