import { Component, Input, OnInit } from '@angular/core';
import {
  IonSelect,
  IonItem,
  IonSelectOption,
  IonList,
  IonIcon, IonText, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pricetagOutline } from 'ionicons/icons';
import { Classification, ClassificationsService } from 'src/app/services/classifications.service';
import { CreateClassificationComponent } from '../create-classification/create-classification.component';

@Component({
  selector: 'app-classifications',
  standalone: true,
  templateUrl: './classifications.component.html',
  styleUrls: ['./classifications.component.scss'],
  imports: [IonFabButton, IonText, IonList, IonItem, IonSelect, IonSelectOption, IonIcon, CreateClassificationComponent],
})
export class ClassificationsComponent implements OnInit {
  customAlertOptions = {};

  @Input() classifications: Classification[] = []


  constructor(private classificationsService: ClassificationsService) {
    addIcons({ pricetagOutline })
  }

  onSelectClassification() {
    console.log('lil peep')
  }

  async ngOnInit() {
    if (!this.classifications.length) {
      this.customAlertOptions = {
        subHeader: 'Not classifications yet',
        translucent: true,
      };
    }
  }
}
