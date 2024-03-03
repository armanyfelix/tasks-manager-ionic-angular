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
} from '@ionic/angular/standalone';
import { TaskComponent } from '../components/task/task.component';
import { TasksService, Task } from '../services/tasks.service';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { CreateClassificationComponent } from '../components/create-classification/create-classification.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class HomePage implements OnInit {
  tasks: Task[] = []

  constructor(private tasksService: TasksService) {}

  async ngOnInit() {
    const data = await this.tasksService.getAll()
    this.tasks = data
    console.log(data)
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  async removeTask(key: string) {
    await this.tasksService.remove(key)
  }


}
