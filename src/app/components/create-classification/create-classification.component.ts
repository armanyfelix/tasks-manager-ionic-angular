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
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as uuid from 'uuid';
import { ApiService } from 'src/app/services/api.service';
import { Classification } from 'src/app/services/classifications.service';

@Component({
  selector: 'app-create-classification',
  templateUrl: './create-classification.component.html',
  styleUrls: ['./create-classification.component.scss'],
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
export class CreateClassificationComponent implements OnInit {
  form!: FormGroup;
  repeatedName = '';
  constructor(public formBuilder: FormBuilder, private api: ApiService) {
    addIcons({ add, checkboxOutline, pricetagOutline });
  }
  @Input() classifications: Classification[] = [];
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
    if (this.form.valid) {
      if (
        this.classifications.some(
          (c: Classification) => c.name === this.form.value.name
        )
      ) {
        this.repeatedName = this.form.value.name
      } else {
        await this.api.set({
          ...this.form.value,
          type: 'classification',
          id: uuid.v4(),
        });
        this.getData.emit(true);
        this.cancel();
        return false;
      }
    } else {
      return console.log('Please provide all the required values!');
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.modal.dismiss(null, 'cancel');
    this.form.reset();
  }
}
