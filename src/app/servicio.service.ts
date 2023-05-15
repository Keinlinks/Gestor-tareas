import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Task } from './Interface/Task';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  constructor(private firestore: AngularFirestore) {
    this.loadTask();
  }
  private dataSubject = new Subject<Task[]>();
  data: Task[] = [];
  //agregar
  addTask(task: Task): Promise<any> {
    return this.firestore
      .collection('tareas_1')
      .add(task)
      .then((data) => {
        console.log('id:', data.id);
      });
  }
  getTasks() {
    return this.data;
  }
  //obtener
  loadTask() {
    this.firestore
      .collection<Task>('tareas_1')
      .valueChanges()
      .subscribe(
        (data) => {
          this.data = data;
          console.log(data);
          this.dataSubject.next(this.data);
        },
        (error) => console.error(error)
      );
  }
  private updateData() {
    // Lógica para actualizar los datos en this.data cuando Firestore cambie
    this.dataSubject.next(this.data);
  }
  getObservable() {
    return this.dataSubject.asObservable();
  }
  //eliminar
  delete(task: Task) {
    this.firestore
      .collection('tareas_1')
      .doc(task.nombre)
      .delete()
      .then(() => console.log('Dato eliminado correctamente'))
      .catch((error) => console.error('Error al eliminar el dato:', error));
  }
  //update
  updateState(id: string, data: any) {
    this.firestore.collection('tareas_1').doc(id).update(data);
  }
}
