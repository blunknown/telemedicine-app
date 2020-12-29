import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Teletry } from 'src/app/core/models/teletry.model';
import { User } from 'src/app/core/models/user.model';
import { TeletryService } from 'src/app/core/services/teletry.service';

@Component({
  selector: 'app-teletriages',
  templateUrl: './teletriages.component.html',
  styleUrls: ['./teletriages.component.scss'],
})
export class TeletriagesComponent implements OnInit {
  isLinear = false;
  displayedColumns: string[] = [
    'glucosa',
    'estado',
    'recomendacion',
    'acciones',
  ];
  dataSource: MatTableDataSource<Teletry>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  currentTeletry: Teletry;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private teletryService: TeletryService,
    private formBuilder: FormBuilder
  ) {
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

  ngOnInit() {
    this.teletryService
      .getTeletriagesByPatientId(this.user._id)
      .subscribe((teletriages) => {
        console.log(teletriages);
        this.dataSource = new MatTableDataSource(teletriages);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.setupFilter();
      });
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (teletry: Teletry, filter: string) =>
      teletry.glucosa.toString().trim().toLowerCase().indexOf(filter) != -1 ||
      teletry.estado.trim().toLowerCase().indexOf(filter) != -1 ||
      teletry.recomendacion.trim().toLowerCase().indexOf(filter) != -1;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectTeletry(teletry: Teletry) {
    this.currentTeletry = teletry;
    console.log(teletry);
    if (teletry.molestia_miccion !== 'No') {
      teletry.tipo_molestia_miccion.forEach(() => {
        this.molestiaField.push(new FormControl(''));
      });
    }
    console.log(teletry);
    this.form.patchValue(teletry);
  }

  get molestiaField() {
    return this.form.get('tipo_molestia_miccion') as FormArray;
  }
}
