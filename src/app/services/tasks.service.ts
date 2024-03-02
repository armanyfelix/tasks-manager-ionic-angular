import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

export interface Task {
  name: string;
  subject: string;
  date: string;
  id: number;
  complete: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public tasks: Task[] = [
    {
      name: 'New event: Trip to Vegas',
      subject: 'Long time no chat',
      date: '9:32 AM',
      id: 0,
      complete: false
    },
    {
      name: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '6:12 AM',
      id: 1,
      complete: false
    },
    {
      name: 'Jordan Firth',
      subject: 'Report Results',
      date: '4:55 AM',
      id: 2,
      complete: false
    },
    {
      name: 'Bill Thomas',
      subject: 'The situation',
      date: 'Yesterday',
      id: 3,
      complete: false
    },
    {
      name: 'Joanne Pollan',
      subject: 'Updated invitation: Swim lessons',
      date: 'Yesterday',
      id: 4,
      complete: false
    },
    {
      name: 'Andrea Cornerston',
      subject: 'Last minute ask',
      date: 'Yesterday',
      id: 5,
      complete: false
    },
    {
      name: 'Moe Chamont',
      subject: 'Family Calendar - Version 1',
      date: 'Last Week',
      id: 6,
      complete: false
    },
    {
      name: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: 'Last Week',
      id: 7,
      complete: false
    }
  ];

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string) {
    this._storage?.get(key);
  }

  public getAll() {
    const tasks: Task[] = []
    this._storage?.forEach((key, value, index) => {
      tasks.push(JSON.parse(value))
    });
    return tasks || []
  }

  public getTaskById(id: number): Task {
    return this.tasks[id];
  }
}
