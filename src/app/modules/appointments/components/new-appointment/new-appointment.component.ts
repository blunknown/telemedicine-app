import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/core/models/appointment.model';
import { User } from 'src/app/core/models/user.model';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
})
export class NewAppointmentComponent implements OnInit {
  form: FormGroup;
  patients: User[];
  currentPatient: string;

  constructor(
    public dialogRef: MatDialogRef<NewAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private _snackBar: MatSnackBar
  ) {
    this.buildForm();
    if (data) {
      const appointment: Appointment = data.appointment;
      appointment.fecha = appointment.fecha.substring(0, 16);
      this.form.patchValue(appointment);
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      paciente: ['', Validators.required],
      razon: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.authService.loggedIn._id;
    this.userService.getPatientsByDoctorId(id).subscribe((patients) => {
      this.patients = patients;
      if (this.data && this.data.appointment) {
        this.patients.forEach((patient) => {
          if (patient._id === this.data.appointment.paciente) {
            this.currentPatient = patient._id;
          }
        });
      }
    });

    // this.teletryService
    //   .getMedicationByTeletryId(this.teletry._id)
    //   .subscribe((medication) => {
    //     this.registrado = medication && medication[0];
    //     if (medication && medication[0]) {
    //       const med = {
    //         medicamentos: medication[0].medicamentos,
    //         indicaciones: medication[0].indicaciones,
    //       };
    //       this.form.patchValue(med);
    //     }
    //   });
  }

  add(): void {
    if (this.form.valid) {
      const appointment: Appointment = this.form.value;
      this.appointmentService.saveAppointment(appointment).subscribe(() => {
        this.dialogRef.close();
        this._snackBar.open('Cita agregada correctamente', 'Ok', {
          duration: 3000,
        });
      });
    }
  }

  udpate(): void {
    if (this.form.valid) {
      const appointment: Appointment = this.form.value;
      this.appointmentService
        .updateAppointment(this.data.appointment._id, appointment)
        .subscribe(() => {
          this.dialogRef.close();
          this._snackBar.open('Cita actualizada correctamente', 'Ok', {
            duration: 3000,
          });
        });
    }
  }
}
