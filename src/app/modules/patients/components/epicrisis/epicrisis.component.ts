import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { EpicrisisService } from 'src/app/core/services/epicrisis.service';

@Component({
  selector: 'app-epicrisis',
  templateUrl: './epicrisis.component.html',
  styleUrls: ['./epicrisis.component.scss'],
})
export class EpicrisisComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private formBuilder: FormBuilder,
    private epicrisisService: EpicrisisService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      fecha_procedimiento: '',
      fecha_alta: '',
      presion_arterial_sistolica: 0,
      presion_arterial_diastolica: 0,
      temperatura: 0,
      frecuencia_arterial: 0,
      frecuencia_respiratoria: 0,
      diagnostico_ingreso: '',
      diagnostico_egreso: '',
      medicacion: this.formBuilder.array([]),
      medidas_terapeuticas: this.formBuilder.array([]),
      fecha_nacimiento: '',
      dias_post_operado: 0,
      dias_alta: 0,
      edad: 0,
    });
  }

  ngOnInit(): void {
    this.epicrisisService
      .getEpicrisisByPatientId(this.user._id)
      .subscribe((epicrisis) => {
        const epi = epicrisis[0];
        epi.medicacion.forEach(() => {
          this.medicacion.push(new FormControl(''));
          this.medidas_terapeuticas.push(new FormControl(''));
        });
        this.form.patchValue(epi);
      });
  }

  get medicacion() {
    return this.form.get('medicacion') as FormArray;
  }

  get medidas_terapeuticas() {
    return this.form.get('medidas_terapeuticas') as FormArray;
  }
}
