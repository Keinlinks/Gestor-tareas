import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoComponent } from '../more-info/more-info.component';
import { Task } from 'src/app/Interface/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent implements OnInit, AfterViewInit {
  constructor(public dialog: MatDialog) {}
  ngAfterViewInit() {
    this.colorFondo();
  }
  @Input() task!: Task;
  @ViewChild('fondo') fondo!: ElementRef;
  ngOnInit(): void {}
  moreInfo() {
    this.dialog.open(MoreInfoComponent, {
      width: '35%',
      data: this.task,
      panelClass: 'matDialog',
    });
  }
  colorFondo() {
    if (this.task.prioridad === 'Alto')
      this.fondo.nativeElement.style.backgroundColor = 'hsl(340, 100%, 42%)';
    if (this.task.prioridad === 'Medio')
      this.fondo.nativeElement.style.backgroundColor = 'hsl(208, 82%, 11%)';
    if (this.task.prioridad === 'Bajo')
      this.fondo.nativeElement.style.backgroundColor = 'hsl(31, 92%, 50%)';
  }
}
