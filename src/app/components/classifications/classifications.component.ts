import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonSelect,
  IonItem,
  IonSelectOption,
  IonList,
  IonIcon,
  IonText,
  IonFabButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pricetagOutline } from 'ionicons/icons';
import { Classification, Task } from 'src/app/services/api.service';
import { CreateClassificationComponent } from '../create-classification/create-classification.component';

@Component({
  selector: 'app-classifications',
  standalone: true,
  templateUrl: './classifications.component.html',
  styleUrls: ['./classifications.component.scss'],
  imports: [
    IonFabButton,
    IonText,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonIcon,
    CreateClassificationComponent,
  ],
})
export class ClassificationsComponent {
  @Input() classifications: Classification[] = [];
  @Output() Filter = new EventEmitter<Classification[]>()

  constructor() {
    addIcons({ pricetagOutline });
  }

  onSelectClassification(e: any) {
    this.Filter.emit(e.target?.value)
  }
}
