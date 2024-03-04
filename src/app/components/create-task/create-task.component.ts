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
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { add, checkboxOutline, pricetagOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ApiService } from 'src/app/services/api.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as uuid from 'uuid';
import { Classification } from 'src/app/services/classifications.service';

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
    IonSelect,
    IonSelectOption,
  ],
})
export class CreateTaskComponent implements OnInit {
  form!: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private api: ApiService
  ) {
    addIcons({ add, checkboxOutline, pricetagOutline });
  }
  @Input() classifications: Classification[] = [];
  @Output() getData = new EventEmitter<boolean>();

  @ViewChild(IonModal) modal!: IonModal;

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', []],
      classification: ['', []],
    });
  }
  get errorControl() {
    return this.form.controls;
  }

  async submit() {
    if (this.form.valid) {
      console.log(this.form.value)
      await this.api.set({
        ...this.form.value,
        type: 'task',
        id: uuid.v4(),
        date: new Date(),
        classification: this.form.value.classification || null,
        complete: false,
      });
      this.getData.emit(true);
      this.cancel();
      return false;
    } else {
      return console.log('Please provide all the required values!');
    }
  }

  onSelectClassification() {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.form.reset();
  }
}
