import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Task } from './Interface/Task';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  constructor(private firestore: AngularFirestore) {}
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
  getData(): Observable<any[]> {
    let task;
    return this.firestore
      .collection('tareas_1')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Task;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

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
  delete(id: string) {
    this.firestore
      .collection('tareas_1')
      .doc(id)
      .delete()
      .then(() => console.log('Dato eliminado correctamente'))
      .catch((error) => console.error('Error al eliminar el dato:', error));
  }
  //update
  updateState(id: string, data: any) {
    this.firestore.collection('tareas_1').doc(id).update(data);
  }
}
