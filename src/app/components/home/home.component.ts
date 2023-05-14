import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoComponent } from '../more-info/more-info.component';
import { ServicioService } from 'src/app/servicio.service';
import { Observable } from 'rxjs';
import { Task } from 'src/app/Interface/Task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(private servicio: ServicioService) {}
  //data
  pendientes: Task[] = [];
  proceso: Task[] = [];
  finalizado: Task[] = [];

  ngOnInit(): void {
    this.servicio.getTask().subscribe((data) => {
      data.map((data) => {
        if (data.estado === 1) this.pendientes.push(data);
        if (data.estado === 2) this.proceso.push(data);
        if (data.estado === 3) this.finalizado.push(data);
      });
    });
  }
  Prueba() {
    console.log(this.pendientes);
  }
}
