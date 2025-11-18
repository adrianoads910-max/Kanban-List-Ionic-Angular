import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

// 🔥 1. Importações do ANGULAR FIRE (Apenas para injeção e Observable)
import { 
  Firestore, 
  collectionData 
} from '@angular/fire/firestore';

// 🔥 2. Importações do SDK NATIVO DO FIREBASE (Para ações CRUD)
// Isso resolve o erro de "Injection Context"
import { 
  collection, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // Injeta a instância do Firestore
  private firestore = inject(Firestore);
  
  // Cria a referência da coleção usando a função nativa
  private tasksCollection = collection(this.firestore, 'tasks');

  // Inicializa o Observable no contexto de criação da classe (Obrigatório para collectionData)
  private tasks$ = collectionData(this.tasksCollection, { idField: 'id' }) as Observable<Task[]>;

  constructor() {}

  /**
   * Retorna o Observable já criado
   */
  getAll(): Observable<Task[]> {
    return this.tasks$;
  }

  /**
   * Adicionar (Usa função nativa do firebase/firestore)
   */
  add(task: Task) {
    const { id, ...taskData } = task;
    
    // addDoc nativo não exige contexto de injeção
    return addDoc(this.tasksCollection, {
      ...taskData,
      status: task.status || 'aberto',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  /**
   * Atualizar
   */
  update(id: string, data: Partial<Task>) {
    const docRef = doc(this.firestore, `tasks/${id}`);
    return updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  }

  /**
   * Mover
   */
  move(id: string, newStatus: string) {
    const docRef = doc(this.firestore, `tasks/${id}`);
    return updateDoc(docRef, {
      status: newStatus as Task['status'],
      updatedAt: new Date()
    });
  }

  /**
   * Deletar
   */
  delete(id: string) {
    const docRef = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(docRef);
  }
}