import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Teletry } from 'src/app/core/models/teletry.model';
import { TeletryService } from 'src/app/core/services/teletry.service';
import { DetailsComponent } from '../../components/details/details.component';

@Component({
  selector: 'app-teletriages',
  templateUrl: './teletriages.component.html',
  styleUrls: ['./teletriages.component.scss'],
})
export class TeletriagesComponent implements OnInit {
  isLinear = false;
  displayedColumns: string[] = [
    'numero',
    'created_at',
    'indicadores',
    'recomendacion',
    'acciones',
  ];
  dataSource: MatTableDataSource<Teletry>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  currentTeletry: Teletry;

  constructor(
    private teletryService: TeletryService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.teletryService.getTeletriages().subscribe((teletriages) => {
      console.log(teletriages);
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
    });
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (teletry: Teletry, filter: string) =>
      teletry.numero.toString().trim().toLowerCase().indexOf(filter) != -1 ||
      teletry.created_at.trim().toLowerCase().indexOf(filter) != -1 ||
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
    // if (teletry.molestia_miccion !== 'No') {
    //   teletry.tipo_molestia_miccion.forEach(() => {
    //     this.molestiaField.push(new FormControl(''));
    //   });
    // }
    // this.dialog.open(DetailsComponent, { data: teletry, autoFocus: false });
  }
}
