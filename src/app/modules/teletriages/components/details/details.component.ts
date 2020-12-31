import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Teletry } from 'src/app/core/models/teletry.model';
import { TeletryService } from 'src/app/core/services/teletry.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  form: FormGroup;
  registrado = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public teletry: Teletry,
    private formBuilder: FormBuilder,
    private teletryService: TeletryService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      medicamentos: '',
      indicaciones: '',
    });
  }

  ngOnInit(): void {
    this.teletryService
      .getMedicationByTeletryId(this.teletry._id)
      .subscribe((medication) => {
        this.registrado = medication && medication[0];
        if (medication && medication[0]) {
          const med = {
            medicamentos: medication[0].medicamentos,
            indicaciones: medication[0].indicaciones,
          };
          this.form.patchValue(med);
        }
      });
  }
}
