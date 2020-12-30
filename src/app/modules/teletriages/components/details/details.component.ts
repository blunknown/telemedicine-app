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

  constructor(
    @Inject(MAT_DIALOG_DATA) public teletry: Teletry,
    private teletryService: TeletryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      temperatura: [''],
      glucosa: [''],
      frecuencia_arterial: [''],
      frecuencia_respiratoria: [''],
      presion_arterial_diastolica: [''],
      presion_arterial_sistolica: [''],
      dolor: [''],
      sangrado_vagina: [''],
      color_sangrado_vagina: [''],
      sangrado_herida: [''],
      color_sangrado_herida: [''],
      coloracion_herida: [''],
      color_coloracion_herida: [],
      molestia_miccion: [''],
      tipo_molestia_miccion: this.formBuilder.array([]),
      veces_defeca_dia: [''],
      textura_heces: [''],
      otros: [''],
      estado: [''],
      recomendacion: [''],
    });
  }
}
