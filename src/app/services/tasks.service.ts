import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Observable } from 'rxjs';

export interface Task {
  name: string;
  description: string;
  date: string;
  id: string;
  complete: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public _storage: Storage | null = null;
  private tasks: Task[] = []

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage
  }
  public async set(task: Task) {
    return await this._storage?.set(task.id, task);
  }

  public remove(key: string) {
    return this._storage?.remove(key);
  }

  public async get(key: string) {
    return await this._storage?.get(key);

  }

  public getAll() {
    this._storage?.forEach((value) => {
      console.log(value)
      this.tasks.push(value);
    })
    return this.tasks
  }
}
