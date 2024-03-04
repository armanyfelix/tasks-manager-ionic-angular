import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  Platform,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonNote,
  IonButton,
  IonActionSheet,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ActivatedRoute, Router } from '@angular/router';
import { ellipsisHorizontalOutline, personCircle } from 'ionicons/icons';
import { TasksService, Task } from '../services/tasks.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
    IonActionSheet,
    IonButton,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonItem,
    IonIcon,
    IonLabel,
    IonNote,
  ],
})
export class ViewTaskPage implements OnInit {
  public task!: Task;
  public actionSheetButtons: any = [];
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor(private tasksService: TasksService, private storage: Storage, private router: Router) {
    addIcons({ personCircle, ellipsisHorizontalOutline });
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const storage = await this.storage.create();
    const data = await storage.get(id);
    this.task = data;
    this.actionSheetButtons = [
      {
        text: 'Delete',
        role: 'destructive',
        data: {
          action: 'delete',
        },
      },
      {
        text: data.complete ? 'Uncomplete' : 'Complete',
        data: {
          action: 'complete',
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ];
  }

  async onCompleteTask() {
    await this.tasksService
      .set({
        ...this.task,
        complete: this.task.complete ? false : true,
      })
      .then(() => {
        this.ngOnInit()
      });
  }

  onRemove() {
    this.tasksService.remove(this.task.id)
      this.router.navigate(['/home'])
  }

  onAction(e: any) {
    const action = e.detail?.data?.action;
    if (action === 'delete') this.onRemove()
    if (action === 'complete') this.onCompleteTask();
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Tasks' : '';
  }
}
