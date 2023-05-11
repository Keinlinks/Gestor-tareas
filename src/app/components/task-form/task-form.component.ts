import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.sass'],
})
export class TaskFormComponent implements OnInit {
  constructor() {}
  taskForm!: FormGroup;
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
}
