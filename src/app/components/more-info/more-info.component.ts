import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/Interface/Task';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.sass'],
})
export class MoreInfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MoreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }
}
