import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  RefresherCustomEvent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
} from '@ionic/angular/standalone';
import { TaskComponent } from '../task/task.component';

import { TasksService, Task } from '../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    TaskComponent,
  ],
})
export class HomePage {
  private data = inject(TasksService);
  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getTasks(): Task[] {
    return this.data.getTasks();
  }
}
