import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoComponent } from '../more-info/more-info.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  moreInfo() {
    const moreInfo = this.dialog.open(MoreInfoComponent, {
      panelClass: 'moreInfo',
    });
  }
}
