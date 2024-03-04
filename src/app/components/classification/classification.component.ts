import { Component, OnInit } from '@angular/core';
import {
  IonSelect,
  IonItem,
  IonSelectOption,
  IonList,
  IonIcon, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pricetagOutline } from 'ionicons/icons';

@Component({
  selector: 'app-classification',
  standalone: true,
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss'],
  imports: [IonText, IonList, IonItem, IonSelect, IonSelectOption, IonIcon],
})
export class ClassificationComponent {
  constructor() {
    addIcons({ pricetagOutline })
  }

  // ngOnInit() {}
}
