import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { Teletry } from 'src/app/core/models/teletry.model';
import { User } from 'src/app/core/models/user.model';
import { TeletryService } from 'src/app/core/services/teletry.service';
import { DetailsTeletriageComponent } from '../details-teletriage/details-teletriage.component';
import { MedicationComponent } from '../medication/medication.component';

@Component({
  selector: 'app-teletriages',
  templateUrl: './teletriages.component.html',
  styleUrls: ['./teletriages.component.scss'],
})
export class TeletriagesComponent implements OnInit {
  loadingCharts = true;
  isLinear = false;
  displayedColumns: string[] = [
    'numero',
    'created_at',
    'estado',
    'indicadores',
    'recomendacion',
    'acciones',
  ];
  dataSource: MatTableDataSource<Teletry>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  teletriages: Teletry[];
  currentTeletry: Teletry;
  form: FormGroup;
  mejorado: number = 0;
  regularEstado: number = 0;
  regularEstacionario: number = 0;
  malEstado: number = 0;

  public doughnutChartLabels: Label[] = [
    'Mejorado',
    'Regular estado',
    'Regular a estacionario',
    'Mal estado',
  ];
  public doughnutChartData: SingleDataSet = [
    this.mejorado,
    this.regularEstado,
    this.regularEstacionario,
    this.malEstado,
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public barChartOptions: ChartOptions = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public lineChartLabels: Label[] = [];
  public barChartLabels: Label[] = ['2018', '2019', '2020', '2021'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Mejorado' },
    { data: [0, 0, 0, 0], label: 'Regular estado' },
    { data: [0, 0, 0, 0], label: 'Regular a estacionario' },
    { data: [0, 0, 0, 0], label: 'Mal estado' },
  ];
  public lineChartDataTemperatura: ChartDataSets[] = [
    {
      data: [],
      label: 'Temperatura',
    },
  ];
  public lineChartDataGlucosa: ChartDataSets[] = [
    {
      data: [],
      label: 'Glucosa',
    },
  ];
  public lineChartDataFrecuenciaArterial: ChartDataSets[] = [
    {
      data: [],
      label: 'Frecuencia Arterial',
    },
  ];
  public lineChartDataFrecuenciaRespiratoria: ChartDataSets[] = [
    {
      data: [],
      label: 'Frecuencia Respiratoria',
    },
  ];
  public lineChartDataPresionArterialDiastolica: ChartDataSets[] = [
    {
      data: [],
      label: 'Presion Arterial Diastolica',
    },
  ];
  public lineChartDataPresionArterialSistolica: ChartDataSets[] = [
    {
      data: [],
      label: 'Presion Arterial Sistolica',
    },
  ];

  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private teletryService: TeletryService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.buildForm();
  }

  loadChart() {
    let mejorado = [0, 0, 0, 0];
    let regularEstado = [0, 0, 0, 0];
    let regularEstacionario = [0, 0, 0, 0];
    let malEstado = [0, 0, 0, 0];
    let index = this.teletriages.length;
    this.teletriages.forEach((teletry) => {
      const year = teletry.created_at.substring(6, 10);
      this.lineChartLabels.unshift(index.toString());
      this.lineChartDataTemperatura[0].data.unshift(teletry.temperatura);
      this.lineChartDataGlucosa[0].data.unshift(teletry.glucosa);
      this.lineChartDataFrecuenciaArterial[0].data.unshift(
        teletry.frecuencia_arterial
      );
      this.lineChartDataFrecuenciaRespiratoria[0].data.unshift(
        teletry.frecuencia_respiratoria
      );
      this.lineChartDataPresionArterialDiastolica[0].data.unshift(
        teletry.presion_arterial_diastolica
      );
      this.lineChartDataPresionArterialSistolica[0].data.unshift(
        teletry.presion_arterial_sistolica
      );
      index--;
      switch (teletry.estado) {
        case 'mejorado':
          this.mejorado++;
          switch (year) {
            case '2018':
              mejorado[0]++;
              break;
            case '2019':
              mejorado[1]++;
              break;
            case '2020':
              mejorado[2]++;
              break;
            case '2021':
              mejorado[3]++;
              break;
            default:
              break;
          }
          break;
        case 'regular estado':
          this.regularEstado++;
          switch (year) {
            case '2018':
              regularEstado[0]++;
              break;
            case '2019':
              regularEstado[1]++;
              break;
            case '2020':
              regularEstado[2]++;
              break;
            case '2021':
              regularEstado[3]++;
              break;

            default:
              break;
          }
          break;
        case 'regular a estacionario':
          this.regularEstacionario++;
          switch (year) {
            case '2018':
              regularEstacionario[0]++;
              break;
            case '2019':
              regularEstacionario[1]++;
              break;
            case '2020':
              regularEstacionario[2]++;
              break;
            case '2021':
              regularEstacionario[3]++;
              break;

            default:
              break;
          }
          break;
        case 'mal estado':
          this.malEstado++;
          switch (year) {
            case '2018':
              malEstado[0]++;
              break;
            case '2019':
              malEstado[1]++;
              break;
            case '2020':
              malEstado[2]++;
              break;
            case '2021':
              malEstado[3]++;
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    });
    this.doughnutChartData = [
      this.mejorado,
      this.regularEstado,
      this.regularEstacionario,
      this.malEstado,
    ];
    this.barChartData[0].data = mejorado;
    this.barChartData[1].data = regularEstado;
    this.barChartData[2].data = regularEstacionario;
    this.barChartData[3].data = malEstado;
    this.loadingCharts = false;
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
        this.teletriages = teletriages;
        let size = teletriages.length;
        teletriages.forEach((teletry) => {
          teletry.numero = size;
          size--;
        });
        console.log(teletriages);
        this.dataSource = new MatTableDataSource(teletriages);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.setupFilter();
        this.loadChart();
      });
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (teletry: Teletry, filter: string) =>
      teletry.numero.toString().trim().toLowerCase().indexOf(filter) != -1 ||
      teletry.created_at.trim().toLowerCase().indexOf(filter) != -1 ||
      teletry.recomendacion.trim().toLowerCase().indexOf(filter) != -1 ||
      teletry.estado.trim().toLowerCase().indexOf(filter) != -1;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // selectTeletry(teletry: Teletry) {
  //   this.currentTeletry = teletry;
  //   console.log(teletry);
  //   if (teletry.molestia_miccion !== 'No') {
  //     teletry.tipo_molestia_miccion.forEach(() => {
  //       this.molestiaField.push(new FormControl(''));
  //     });
  //   }
  //   console.log(teletry);
  //   this.form.patchValue(teletry);
  // }

  selectTeletry(teletry: Teletry): void {
    this.dialog.open(DetailsTeletriageComponent, {
      data: teletry,
      autoFocus: false,
    });
  }

  get molestiaField() {
    return this.form.get('tipo_molestia_miccion') as FormArray;
  }

  showMedication(teletry: Teletry) {
    this.dialog.open(MedicationComponent, { data: teletry, autoFocus: false });
  }
}
