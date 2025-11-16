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

  getAll() {
    return this.tasks;
  }

  create(task: Task) {
    task.id = crypto.randomUUID();
    this.tasks.push(task);
    this.save();
  }

  update(id: string, data: Partial<Task>) {
    this.tasks = this.tasks.map(t => t.id === id ? { ...t, ...data } : t);
    this.save();
  }

  delete(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  load() {
    const saved = localStorage.getItem('tasks');
    if (saved) this.tasks = JSON.parse(saved);
  }
}
