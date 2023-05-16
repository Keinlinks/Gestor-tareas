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
  data: any[] = [];

  ngOnInit(): void {
    this.servicio.getData().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => console.error(error)
    );
  }
  Prueba() {
    console.log(this.data);
  }
}
