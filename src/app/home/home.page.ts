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
import { Task } from '../services/api.service';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { CreateClassificationComponent } from '../components/create-classification/create-classification.component';
import { NgFor } from '@angular/common';
import { ClassificationsComponent } from '../components/classifications/classifications.component';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { Classification } from '../services/classifications.service';

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
    ClassificationsComponent,
    NgFor,
  ],
})
export class HomePage implements OnInit {
  allTasks: Task[] = [];
  tasks: Task[] = [];
  classifications: Classification[] = [];
  emptyTasks: boolean = false;

  constructor(private storage: Storage, private route: ActivatedRoute) {
    this.route.params.subscribe(() => this.ngOnInit());
  }

  async ngOnInit() {
    const tasks: Task[] = [];
    const classifications: Classification[] = [];
    const storage = await this.storage.create();
    await storage.forEach((value) => {
      if (value.type === 'task') {
        tasks.push(value);
      }
      if (value.type === 'classification') {
        classifications.push(value);
      }
    });
    if (!tasks.length) {
      this.emptyTasks = true;
    } else {
      this.emptyTasks = false;
      this.tasks = tasks;
      this.allTasks = tasks;
    }
    this.classifications = classifications;
  }

  Filter(classifications: Classification[]) {
    if (!classifications.length) {
      this.tasks = this.allTasks;
    } else {
      const res = this.allTasks.filter((t: any) => classifications.some((c) => c.id === t.classification?.id))
      this.tasks = res;
    }
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }
}
