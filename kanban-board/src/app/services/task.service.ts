import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];

  constructor() {
    this.load();
  }

  /** Retorna todas as tarefas */
  getAll() {
    return this.tasks;
  }

  /** Edita campos de uma tarefa existente */
  update(id: string, data: Partial<Task>) {
    this.tasks = this.tasks.map(t => 
      t.id === id 
        ? { ...t, ...data, updatedAt: new Date() } 
        : t
    );
    this.save();
  }

  /** Move uma tarefa entre colunas */
  add(task: Task) {
  const newTask: Task = {
    ...task,
    id: crypto.randomUUID(),
    status: task.status as Task['status'],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  this.tasks.push(newTask);
  this.save();
}

move(id: string, newStatus: string) {
  const task = this.tasks.find(t => t.id === id);

  if (task) {
    task.status = newStatus as Task['status'];
    task.updatedAt = new Date();
    this.save();
  }
}

  /** Deleta tarefa */
  delete(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  /** Salva no localStorage */
  private save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  /** Carrega do localStorage */
  private load() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  }
}
