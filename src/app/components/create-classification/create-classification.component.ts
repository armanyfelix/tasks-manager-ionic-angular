import { Component, ViewChild } from '@angular/core';
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
  ],
})
export class CreateClassificationComponent {
  constructor() {
    addIcons({ add, checkboxOutline, pricetagOutline });
  }

  @ViewChild(IonModal) modal!: IonModal;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    console.log(this.modal)
    this.modal.dismiss(null, 'cancel');
  }

  save() {
    this.modal.dismiss(this.name, 'save');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    console.log(ev);
  }
}
