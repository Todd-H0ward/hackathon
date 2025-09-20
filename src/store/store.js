import { makeAutoObservable } from 'mobx';
import { AuthStore } from './auth.js';
import { IncidentStore } from '@/store/incidents.js';
import { NewMapStore } from '@/store/newMap.js';
import { NewsStore } from '@/store/news.js';

class Store {
  auth;
  incidents;
  newsMap;
  news;

  constructor() {
    this.auth = new AuthStore();
    this.incidents = new IncidentStore();
    this.newsMap = new NewMapStore();
    this.news = new NewsStore();

    makeAutoObservable(this);
  }
}

export default Store;
