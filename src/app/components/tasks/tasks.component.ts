import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  Platform,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonCheckbox,
  IonActionSheet,
  IonList, IonText } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import { chevronForward } from 'ionicons/icons';
import { Task, TasksService } from '../../services/tasks.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  providers: [TasksService],
  imports: [IonText,
    IonList,
    IonActionSheet,
    IonCheckbox,
    CommonModule,
    RouterLink,
    IonItem,
    IonLabel,
    IonNote,
    IonIcon,
  ],
})
export class TasksComponent {
  private platform = inject(Platform);
  actionSheetButtons: any;

  constructor(private tasksService: TasksService, private storage: Storage) {
    addIcons({ chevronForward });
  }

  @Input() tasks: Task[] = [];
  @Input() emptyTasks!: boolean
  @Output() completeTask = new EventEmitter<boolean>();

  // async ngOnInit() {
  //   const tasks: Task[] = [];
  //   await this.storage.defineDriver(cordovaSQLiteDriver);
  //   const storage = await this.storage.create();
  //   storage.forEach((value) => {
  //     tasks.push(value);
  //   });
  //   this.tasks = tasks;
  // }

  async onCompleteTask(event: Event, task: Task) {
    event.stopPropagation();
    this.completeTask.emit(true);
    await this.tasksService.set({
      ...task,
      complete: task.complete ? false : true,
    }).then(() => {
      this.tasksService.getAll()
    })
  }

  isIos() {
    return this.platform.is('ios');
  }
}
