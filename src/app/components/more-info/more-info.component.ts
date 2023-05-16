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
  id: string = '';
  constructor(
    public dialogRef: MatDialogRef<MoreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private servicio: ServicioService,
    public dialog: MatDialog,
    private firestore: AngularFirestore
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }
  eliminar() {
    this.dialog.open(Confirmacion, { data: this.data.id });
  }

  cambiar() {}
  editar() {}
  Cambiar_estado() {
    if (this.data.estado == 1) this.data.estado = 2;
    else this.data.estado = 3;
    let idTask = this.data.id ?? '';
    this.servicio.updateState(idTask, this.data);
    console.log(idTask);
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
      <button mat-button mat-dialog-close (click)="close()">No</button>
    </div>`,
  styleUrls: ['./estilos_dialog.css'],
})
export class Confirmacion {
  constructor(
    private servicio: ServicioService,
    public dialogRef: MatDialogRef<Confirmacion>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  eliminar() {
    console.log('Eliminar entra');
    this.servicio.delete(this.data);
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
}
