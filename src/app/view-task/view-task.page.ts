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
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ActivatedRoute, Router } from '@angular/router';
import { ellipsisHorizontalOutline, personCircle, pricetagOutline } from 'ionicons/icons';
import { Task, ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { Classification } from '../services/classifications.service';
import { ClassificationsComponent } from '../components/classifications/classifications.component';

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
    IonSelect,
    IonSelectOption,
    ClassificationsComponent,
  ],
})
export class ViewTaskPage implements OnInit {
  public task!: Task;
  public classifications: Classification[] = [];
  public actionSheetButtons: any = [];
  customAlertOptions = {};
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor(
    private api: ApiService,
    private storage: Storage,
    private router: Router
  ) {
    addIcons({ personCircle, ellipsisHorizontalOutline, pricetagOutline });
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const storage = await this.storage.create();
    const task = await storage.get(id);
    this.task = task;
    const classifications: Classification[] = [];
    await storage.forEach((value) => {
      if (value.type === 'classification') {
        classifications.push(value);
      }
    });
    this.classifications = classifications;
    if (!this.classifications.length) {
      this.customAlertOptions = {
        subHeader: 'Not classifications yet',
        translucent: true,
      };
    }
    this.actionSheetButtons = [
      {
        text: 'Delete',
        role: 'destructive',
        data: {
          action: 'delete',
        },
      },
      {
        text: task.complete ? 'Uncomplete' : 'Complete',
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
    await this.api
      .set({
        ...this.task,
        complete: this.task.complete ? false : true,
      })
      .then(() => {
        this.ngOnInit();
      });
  }

  async onSelectClassification(e: any) {
    const res = await this.api.set({
      ...this.task,
      classification: e.target?.value || null,
    }).then(() => {
      this.ngOnInit()
    })
    console.log(res)
  }

  onRemove() {
    this.api.remove(this.task.id);
    this.router.navigate(['/home']);
  }

  onAction(e: any) {
    const action = e.detail?.data?.action;
    if (action === 'delete') this.onRemove();
    if (action === 'complete') this.onCompleteTask();
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Tasks' : '';
  }
}
