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
  data: Task[] = [];

  pendientes: Task[] = [];
  proceso: Task[] = [];
  finalizado: Task[] = [];

  ngOnInit(): void {
    this.data = this.servicio.getTasks();
    this.servicio.getObservable().subscribe(
      (data) => {
        this.data = data;
        this.pendientes = data;
      },
      (error) => console.error(error)
    );
  }
  Prueba() {
    console.log(this.data);
  }
}
