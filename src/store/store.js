import { makeAutoObservable } from 'mobx';
import { AuthStore } from './auth.js';
import { NewsStore } from '@/store/news.js';
import { NewMapStore } from '@/store/newMap.js';

class Store {
  auth;
  news;
  newsMap;

  constructor() {
    this.auth = new AuthStore();
    this.news = new NewsStore();
    this.newsMap = new NewMapStore();

    makeAutoObservable(this);
  }
}

export default Store;
