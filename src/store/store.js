import { makeAutoObservable } from 'mobx';
import { AuthStore } from './auth.js';
import { IncidentStore } from '@/store/incidents.js';
import { NewMapStore } from '@/store/newMap.js';
import { NewsStore } from '@/store/news.js';
import { SensorsStore } from '@/store/sensors.js';

class Store {
  auth;
  incidents;
  newsMap;
  news;
  sensors;

  constructor() {
    this.auth = new AuthStore();
    this.incidents = new IncidentStore();
    this.newsMap = new NewMapStore();
    this.news = new NewsStore();
    this.sensors = new SensorsStore();

    makeAutoObservable(this);
  }
}

export default Store;
