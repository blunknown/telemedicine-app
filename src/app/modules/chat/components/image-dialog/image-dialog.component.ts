import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent implements OnInit {
  imagePath: string;

  constructor(@Inject(MAT_DIALOG_DATA) public image: string) {
    this.imagePath = `${environment.baseUrl}/${image}`;
    console.log(this.imagePath);
  }

  ngOnInit(): void {}
}
