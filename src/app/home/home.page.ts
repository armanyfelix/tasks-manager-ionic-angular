import { Component, OnInit, inject } from '@angular/core';
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
import { Task } from '../services/tasks.service';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { CreateClassificationComponent } from '../components/create-classification/create-classification.component';
import { NgFor } from '@angular/common';
import { ClassificationComponent } from '../components/classification/classification.component';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';

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
  ],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];

  constructor(private storage: Storage, private route: ActivatedRoute) {
    this.route.params.subscribe(() => this.ngOnInit());
  }

  async ngOnInit() {
    const tasks: Task[] = [];
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
}
