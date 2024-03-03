import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Platform, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonItem, IonIcon, IonLabel, IonNote } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ActivatedRoute } from '@angular/router';
import { personCircle } from 'ionicons/icons';
import { TasksService, Task } from '../services/tasks.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonItem, IonIcon, IonLabel, IonNote],
})
export class ViewTaskPage implements OnInit {
  public task!: Task;
  private data = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {
    addIcons({ personCircle });
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const data = await this.data.getTaskById(id);
    this.task = data.value
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }
}
