import { makeAutoObservable } from 'mobx';
import { AuthStore } from './auth.js';
import { IncidentStore } from '@/store/incidents.js';
import { NewMapStore } from '@/store/newMap.js';

class Store {
  auth;
  incidents;
  newsMap;

  constructor() {
    this.auth = new AuthStore();
    this.incidents = new IncidentStore();
    this.newsMap = new NewMapStore();

    makeAutoObservable(this);
  }
}

export default Store;
