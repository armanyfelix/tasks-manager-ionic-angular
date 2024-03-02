import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Platform, IonItem, IonLabel, IonNote, IonIcon, IonCheckbox } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import { chevronForward } from 'ionicons/icons';
import { Task } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [IonCheckbox, CommonModule, RouterLink, IonItem, IonLabel, IonNote, IonIcon],

})
export class TaskComponent {
  private platform = inject(Platform);
  @Input() task?: Task;
  @Output() completeTask = new EventEmitter<boolean>();
  onCompleteTask(event: Event) {
    event.stopPropagation()
    this.completeTask.emit(true)
  }
  isIos() {
    return this.platform.is('ios')
  }
  constructor() {
    addIcons({ chevronForward });
  }
}
