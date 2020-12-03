import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageRequest } from 'src/app/core/interfaces/message-request.interface';
import { Message } from 'src/app/core/models/message.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { UserService } from 'src/app/core/services/user.service';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  form: FormGroup;
  selectedUser: User;
  users: User[];
  messages: Message[] = [];
  loggedIn: User;
  isLoadingUsers = false;
  isLoadingMessages = false;
  imageBase64: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    private socketService: SocketService,
    public dialog: MatDialog
  ) {
    this.buildForm();
    this.loggedIn = this.authService.loggedIn;
  }

  ngOnInit(): void {
    this.isLoadingUsers = true;
    const users$ =
      this.loggedIn.roles[0] === 'doctor'
        ? this.userService.getPatientsByDoctorId(this.loggedIn._id)
        : this.userService.getDoctorsByPatientId(this.loggedIn._id);
    users$.subscribe((users) => {
      this.users = users;
      this.isLoadingUsers = false;
    });
    this.socketService.listen('sendMessage').subscribe((message: Message) => {
      this.messages = [...this.messages, message];
    });
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      message: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  selectUser(user: User): void {
    this.isLoadingMessages = true;
    this.selectedUser = user;
    this.getMessages(this.selectedUser._id);
  }

  getMessages(userId: string): void {
    this.messageService.getMessages(userId).subscribe((messageResponse) => {
      this.messages = messageResponse.messages;
      this.isLoadingMessages = false;
    });
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const { message } = this.form.value;
      const { _id } = this.selectedUser;
      const messageRequest: MessageRequest = {
        receiver: _id,
        texto: message,
      };
      this.socketService.emit('sendMessage', messageRequest);
      this.form.patchValue({ message: '' });
    }
  }

  getMessageClass(message: Message): string {
    if (this.loggedIn.roles[0] === 'paciente') {
      return message.dir === 1
        ? 'bg-primary'
        : 'bg-accent d-flex justify-content-end';
    } else {
      return message.dir === 0
        ? 'bg-primary'
        : 'bg-accent d-flex justify-content-end';
    }
  }

  onImageSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const image = target.files[0];
      this.uploadImage(image);
    }
  }

  uploadImage(image: File): void {
    const { _id } = this.selectedUser;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const messageRequest: MessageRequest = {
        receiver: _id,
        image: ev.target.result.toString(),
      };
      this.socketService.emit('sendMessage', messageRequest);
    };
    reader.readAsDataURL(image);
  }

  openImage(image: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: image,
    });
  }
}
