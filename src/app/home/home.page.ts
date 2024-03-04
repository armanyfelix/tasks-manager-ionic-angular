import { Component, OnInit } from '@angular/core';
import {
  RefresherCustomEvent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
  IonInput,
  IonIcon,
  IonFab,
  IonFabButton,
  IonFabList,
  IonActionSheet,
  IonChip,
} from '@ionic/angular/standalone';
import { TasksComponent } from '../components/tasks/tasks.component';
import { TasksService, Task } from '../services/tasks.service';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { CreateClassificationComponent } from '../components/create-classification/create-classification.component';
import { NgFor } from '@angular/common';
import { ClassificationComponent } from '../components/classification/classification.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonChip,
    IonActionSheet,
    IonFabList,
    IonFabButton,
    IonFab,
    IonIcon,
    IonInput,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    TasksComponent,
    CreateTaskComponent,
    CreateClassificationComponent,
    ClassificationComponent,
    NgFor,
  ]
})
export class HomePage {
  tasks: Task[] = [];

  constructor(private tasksService: TasksService) {}

  // async ngOnInit() {
  //   const tasks: Task[] = [];
  //   // await this.storage.defineDriver(cordovaSQLiteDriver);
  //   // const storage = await this.storage.create();
  //   // storage.forEach((value) => {
  //   //   console.log(value)
  //   //   tasks.push(value);
  //   // });
  //   const data = await this.tasksService.getAll()
  //   this.tasks = tasks;
  // }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  async removeTask(key: string) {
    await this.tasksService.remove(key);
  }
}
