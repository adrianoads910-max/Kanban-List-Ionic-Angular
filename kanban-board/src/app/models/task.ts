export interface Subtask {
  label: string;
  done: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'baixa' | 'media' | 'alta';
  status: 'aberto' | 'em-andamento' | 'concluido' | 'done-done';
  subtasks: Subtask[];

  createdAt?: Date;
  updatedAt?: Date;
}
