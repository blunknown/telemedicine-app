import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nombres: '',
      apellidos: '',
      dni: '',
      fecha_nacimiento: '',
      estado_civil: '',
      telefono: '',
      provincia: '',
      domicilio: '',
    });
    this.form.patchValue(this.user);
  }

  ngOnInit(): void {}
}
