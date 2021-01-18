import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Teletry } from 'src/app/core/models/teletry.model';
import { TeletryService } from 'src/app/core/services/teletry.service';

@Component({
  selector: 'app-details-teletriage',
  templateUrl: './details-teletriage.component.html',
  styleUrls: ['./details-teletriage.component.scss'],
})
export class DetailsTeletriageComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public teletry: Teletry,
    private formBuilder: FormBuilder,
    private teletryService: TeletryService
  ) {
    this.buildForm(this.teletry);
  }

  buildForm(teletry: Teletry) {
    this.form = this.formBuilder.group({
      temperatura: '',
      glucosa: '',
      frecuencia_arterial: '',
      frecuencia_respiratoria: '',
      presion_arterial_diastolica: '',
      presion_arterial_sistolica: '',
      dolor: '',
      // sangrado_vagina: [''],
      // color_sangrado_vagina: [''],
      // sangrado_herida: [''],
      // color_sangrado_herida: [''],
      // coloracion_herida: [''],
      // color_coloracion_herida: [],
      // molestia_miccion: [''],
      // tipo_molestia_miccion: this.formBuilder.array([]),
      veces_defeca_dia: [''],
      textura_heces: [''],
      // otros: [''],
      estado: [''],
      recomendacion: [''],
    });
    if (teletry.sangrado_vagina !== 'No') {
      this.form.addControl('color_sangrado_vagina', new FormControl(''));
    }
    if (teletry.sangrado_herida !== 'No') {
      this.form.addControl('color_sangrado_herida', new FormControl(''));
    }
    if (teletry.coloracion_herida !== 'No') {
      this.form.addControl('color_coloracion_herida', new FormControl(''));
    }
    if (teletry.molestia_miccion !== 'No') {
      this.form.addControl('tipo_molestia_miccion', this.formBuilder.array([]));
      teletry.tipo_molestia_miccion.forEach(() => {
        this.tipo_molestia_miccion.push(new FormControl(''));
      });
    }
    if (teletry.otros !== '') {
      this.form.addControl('otros', new FormControl(''));
    }
    this.form.patchValue(this.teletry);
    console.log(teletry);
    console.log(this.form.value);
    console.log(Object.keys(this.form.controls));
  }

  get tipo_molestia_miccion() {
    return this.form.get('tipo_molestia_miccion') as FormArray;
  }

  get otros() {
    return this.form.get('otros') as FormArray;
  }

  get color_sangrado_vagina() {
    return this.form.get('color_sangrado_vagina') as FormArray;
  }

  get color_sangrado_herida() {
    return this.form.get('color_sangrado_herida') as FormArray;
  }

  get color_coloracion_herida() {
    return this.form.get('color_sangrado_herida') as FormArray;
  }

  ngOnInit(): void {}
}
