import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

export interface Task {
  name: string;
  description: string;
  date: string;
  id: number;
  complete: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _storage: Storage | null = null;
  private tasks: Task[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    const storage = await this.storage.create();
    // await this.storage?.forEach((value) => {
    //   console.log(value)
    //   this.tasks.push(value)
    // });
    this._storage = storage;
  }
  public async set(key: string, value: Task) {
    console.log(key, value);
    const result = await this._storage?.set(key, value);

    console.log('result', result);
  }

  public remove(key: string) {
    this._storage?.remove(key);
  }

  public get(key: string) {
    this._storage?.get(key);
  }

  public async getAll() {
    const tasks: Task[] = [];
    const s = await this.storage?.create();

    await s.forEach((value) => {
      console.log(value);
      tasks.push(value);
    });

    console.log('what', tasks);
    return tasks;
  }

  public async getTaskById(id: string) {
    return await this._storage?.get(id);
  }
}
