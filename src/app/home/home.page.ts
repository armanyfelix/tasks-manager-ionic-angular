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
  IonFabList, IonActionSheet, IonChip } from '@ionic/angular/standalone';
import { TaskComponent } from '../components/task/task.component';
import { TasksService, Task } from '../services/tasks.service';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { CreateClassificationComponent } from '../components/create-classification/create-classification.component';
import { Storage } from '@ionic/storage';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonChip, IonActionSheet,
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
    TaskComponent,
    CreateTaskComponent,
    CreateClassificationComponent,
    NgFor,
  ],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];

  constructor(private tasksService: TasksService, private storage: Storage) {}

  async ngOnInit() {
    const tasks: Task[] = [];
    await this.storage.defineDriver(cordovaSQLiteDriver);
    const storage = await this.storage.create();
    storage.forEach((value) => {
      tasks.push(value);
    });
    this.tasks = tasks;
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  async removeTask(key: string) {
    await this.tasksService.remove(key);
  }
}
