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
  IonList, IonItem, IonInput, IonIcon } from '@ionic/angular/standalone';
import { TaskComponent } from '../task/task.component';
import { TasksService, Task } from '../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonItem,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    TaskComponent,
    AddTaskComponent,
  ],
})
export class HomePage {
  private data = inject(TasksService);


  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getTasks(): Task[] {
    return this.data.getTasks();
  }
}
