import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonItem,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonFabList,
  IonText,
  IonTextarea,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { add, checkboxOutline, pricetagOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TasksService } from 'src/app/services/tasks.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonText,
    IonFabList,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonItem,
    IonInput,
    IonFab,
    IonFabButton,
    IonIcon,
    ReactiveFormsModule,
  ],
})
export class CreateTaskComponent implements OnInit {
  form!: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private tasksService: TasksService
  ) {
    addIcons({ add, checkboxOutline, pricetagOutline });
  }
  @Output() getData = new EventEmitter<boolean>();

  @ViewChild(IonModal) modal!: IonModal;

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', []],
    });
  }
  get errorControl() {
    return this.form.controls;
  }

  async submit() {
    console.log(this.form.valid);
    if (this.form.valid) {
      await this.tasksService.set({
        ...this.form.value,
        type: 'task',
        id: uuid.v4(),
        date: new Date(),
        complete: false,
      });
      this.getData.emit(true);
      this.cancel();
      return false;
    } else {
      return console.log('Please provide all the required values!');
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.form.reset();
  }
}
