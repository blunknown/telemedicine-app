import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { Teletry } from 'src/app/core/models/teletry.model';
import { TeletryService } from 'src/app/core/services/teletry.service';

@Component({
  selector: 'app-teletry',
  templateUrl: './teletry.component.html',
  styleUrls: ['./teletry.component.scss'],
})
export class TeletryComponent implements OnInit {
  @ViewChild('f') myNgForm;
  form: FormGroup;
  tiposMiccion: any[] = [
    {
      value: 'Miccion escasa o no miccion',
      text: 'Miccion escasa o no miccion',
      disabled: true,
      checked: false,
    },
    {
      value: 'Ardor al miccionar',
      text: 'Ardor al miccionar',
      disabled: true,
      checked: false,
    },
    {
      value: 'Sensacion de miccion incompleta',
      text: 'Sensacion de miccion incompleta',
      disabled: true,
      checked: false,
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private teletryService: TeletryService,
    private _snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm(): void {
    this.form = this.formBuilder.group({
      temperatura: ['', [Validators.required]],
      glucosa: ['', [Validators.required]],
      frecuencia_arterial: ['', [Validators.required]],
      frecuencia_respiratoria: ['', [Validators.required]],
      presion_arterial_diastolica: ['', [Validators.required]],
      presion_arterial_sistolica: ['', [Validators.required]],
      dolor: ['', [Validators.required]],
      sangrado_vagina: ['', [Validators.required]],
      color_sangrado_vagina: [{ value: null, disabled: true }],
      sangrado_herida: ['', [Validators.required]],
      color_sangrado_herida: [{ value: null, disabled: true }],
      coloracion_herida: ['', [Validators.required]],
      color_coloracion_herida: [{ value: null, disabled: true }],
      molestia_miccion: ['', [Validators.required]],
      tipo_molestia_miccion: this.formBuilder.array([]),
      veces_defeca_dia: ['', [Validators.required]],
      textura_heces: ['', [Validators.required]],
      otros: ['', [Validators.required]],
    });
  }

  handleTiposMiccion(event: MatCheckboxChange) {
    console.log(this.tiposMiccion);
    const tipo_molestia_miccion = this.form.get(
      'tipo_molestia_miccion'
    ) as FormArray;
    if (event.checked) {
      tipo_molestia_miccion.push(new FormControl(event.source.value));
    } else {
      const index = tipo_molestia_miccion.controls.findIndex(
        (control) => control.value === event.source.value
      );
      tipo_molestia_miccion.removeAt(index);
    }
    console.log(this.form);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const teletry: Teletry = this.form.value;
      this.teletryService.createTeletry(teletry).subscribe((teletry) => {
        console.log(teletry);
        this.form.reset();
        const formArray = this.form.controls[
          'tipo_molestia_miccion'
        ] as FormArray;
        formArray.clear();
        this.myNgForm.resetForm();
        this.tiposMiccion.map((tipo) => {
          tipo.checked = false;
        });
        this._snackBar.open('Teletriaje realizado correctamente', 'Ok', {
          duration: 3000,
        });
      });
    }
  }

  handleRadio(event: MatRadioChange) {
    let name = '';
    if (event.source.name === 'molestia_miccion') {
      name = `tipo_${event.source.name}`;
    } else {
      name = `color_${event.source.name}`;
    }
    console.log(event.value);
    console.log(name);
    if (event.value === 'Si') {
      if (name === 'tipo_molestia_miccion') {
        this.tiposMiccion.map((tipo) => (tipo.disabled = false));
      }
      this.form.controls[name].setValidators([Validators.required]);
      this.form.controls[name].enable();
      this.form.controls[name].updateValueAndValidity();
    } else {
      if (name === 'tipo_molestia_miccion') {
        this.tiposMiccion.map((tipo) => {
          tipo.disabled = true;
          tipo.checked = false;
        });
        const formArray = this.form.controls[name] as FormArray;
        formArray.clear();
      } else {
        this.form.controls[name].setValue(null);
      }
      this.form.controls[name].clearValidators();
      this.form.controls[name].disable();
      this.form.controls[name].updateValueAndValidity();
    }
  }
}
