import { Injectable, Input } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { ApiService } from './api.service';

export interface Classification {
  name: string;
  id: string;
  type: 'classification';
}

@Injectable({
  providedIn: 'root',
})
export class ClassificationsService {
  public _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(classification: Classification) {
    return await this._storage?.set(classification.id, classification);
  }

  public remove(key: string) {
    return this._storage?.remove(key);
  }

  public async get(key: string) {
    return await this._storage?.get(key);
  }

  // public getAll() {
  //   const classifications: Classification[] = [];
  //   const data = this.tasksService?.getAll()
  //   console.log(data)
  //   return classifications;
  // }
}
