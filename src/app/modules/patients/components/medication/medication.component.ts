import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medication } from 'src/app/core/models/medication.model';
import { Teletry } from 'src/app/core/models/teletry.model';
import { TeletryService } from 'src/app/core/services/teletry.service';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss'],
})
export class MedicationComponent implements OnInit {
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

  saveMedication(): void {
    const medication: Medication = this.form.value;
    medication.encuesta = this.teletry._id;
    this.teletryService.createMedication(medication).subscribe((medication) => {
      console.log(medication);
    });
  }
}
