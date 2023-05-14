import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from 'src/app/servicio.service';
import { Task } from 'src/app/Interface/Task';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.sass'],
})
export class TaskFormComponent implements OnInit {
  constructor(private servicio: ServicioService, private dialog: MatDialog) {}
  taskForm!: FormGroup;
  date = new Date();
  ngOnInit(): void {
    this.taskForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      descripcion: new FormControl(''),
      f_inicio: new FormControl(''),
      f_limite: new FormControl(''),
      prioridad: new FormControl(''),
    });
  }
  submit() {
    const tasks = this.taskForm.controls;
    let task: Task = {
      nombre: tasks['nombre'].value,
      descripcion: tasks['descripcion'].value,
      f_inicio: tasks['f_inicio'].value,
      f_limite: tasks['f_limite'].value,
      prioridad: tasks['prioridad'].value,
      estado: 1,
      creacion: this.date.toLocaleDateString(),
    };
    console.log(task);
    this.servicio.addTask(task).then(
      () => {
        console.log('agregada con exito');
        this.openDialog();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}
@Component({
  selector: 'dialog-elements-example-dialog',
  template: `<h1 mat-dialog-title>Exito!</h1>
    <div mat-dialog-content>Se ha creado correctamente!</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cerrar</button>
    </div>`,
})
export class DialogElementsExampleDialog {}
