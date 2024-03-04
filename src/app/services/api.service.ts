import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

export interface Task {
  type: "task";
  name: string;
  description: string;
  classification: Classification | null;
  date: string;
  id: string;
  complete: boolean;
}

export interface Classification {
  name: string;
  id: string;
  type: 'classification';
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(value: Task | Classification) {
    return await this._storage?.set(value.id, value);
  }

  public remove(key: string) {
    return this._storage?.remove(key);
  }

  public async get(key: string) {
    return await this._storage?.get(key);
  }

  public getAll() {
    const values: Task[] | Classification[] = [];
    this._storage?.forEach((value) => {
      values.push(value);
    });
    return values;
  }
}
