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
  IonActionSheet, IonCheckbox } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ActivatedRoute } from '@angular/router';
import { ellipsisHorizontalOutline, personCircle } from 'ionicons/icons';
import { TasksService, Task } from '../services/tasks.service';
import { Storage } from '@ionic/storage';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
  standalone: true,
  imports: [IonCheckbox,
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
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Complete',
      data: {
        action: 'share',
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
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor(private storage: Storage) {
    addIcons({ personCircle, ellipsisHorizontalOutline });
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    await this.storage.defineDriver(cordovaSQLiteDriver);
    const storage = await this.storage.create();
    const data = await storage.get(id);
    this.task = data;
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }
}
