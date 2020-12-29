import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../../components/details/details.component';
import { TeletriagesComponent } from '../../components/teletriages/teletriages.component';
import { EpicrisisComponent } from '../../components/epicrisis/epicrisis.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  displayedColumns: string[] = [
    'nombres',
    'apellidos',
    'dni',
    'ue',
    'ur',
    'acciones',
  ];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  loggedIn: User;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.loggedIn = this.authService.loggedIn;
  }

  ngOnInit(): void {
    this.userService
      .getPatientsByDoctorId(this.loggedIn._id)
      .subscribe((users) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.setupFilter();
      });
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (user: User, filter: string) =>
      user.nombres.trim().toLowerCase().indexOf(filter) != -1 ||
      user.apellidos.trim().toLowerCase().indexOf(filter) != -1 ||
      user.dni.toString().trim().toLowerCase().indexOf(filter) != -1;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetails(user: User): void {
    this.dialog.open(DetailsComponent, { data: user, autoFocus: false });
  }

  openTeletriages(user: User): void {
    this.dialog.open(TeletriagesComponent, { data: user, autoFocus: false });
  }

  openEpicrisis(user: User): void {
    this.dialog.open(EpicrisisComponent, { data: user, autoFocus: false });
  }
}
