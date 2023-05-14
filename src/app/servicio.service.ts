import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Task } from './Interface/Task';
@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  constructor(private firestore: AngularFirestore) {}
  addTask(task: Task): Promise<any> {
    return this.firestore.collection('tareas_1').add(task);
  }
  getTask() {
    return this.firestore.collection<Task>('tareas_1').valueChanges();
  }
}
