import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Task } from 'src/app/Interface/Task';
import { ServicioService } from 'src/app/servicio.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.sass'],
})
export class MoreInfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MoreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private servicio: ServicioService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }
  eliminar() {
    this.dialog.open(Confirmacion, { data: this.data });
  }

  cambiar() {}
  editar() {}
  Cambiar_estado() {
    if (this.data.estado == 1) this.data.estado = 2;
    if (this.data.estado == 2) this.data.estado = 3;
    //this.servicio.updateState(this.data, this.data);
  }
}

@Component({
  selector: 'Confirmacion',
  template: `<h1 mat-dialog-title>Estas seguro?</h1>
    <div mat-dialog-content>La tarea se eliminara para siempre</div>
    <div
      mat-dialog-actions
      style="justify-content: center; display:flex; gap: 5px"
    >
      <button (click)="eliminar()">Si</button>
      <button mat-button mat-dialog-close>No</button>
    </div>`,
  styleUrls: ['./estilos_dialog.css'],
})
export class Confirmacion {
  constructor(
    private servicio: ServicioService,
    public dialogRef: MatDialogRef<Confirmacion>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}
  eliminar() {
    console.log('Eliminar entra');
    this.servicio.delete(this.data);
  }
}
