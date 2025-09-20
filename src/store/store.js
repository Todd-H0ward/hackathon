import { makeAutoObservable } from 'mobx';
import { AuthStore } from './auth.js';
import { CounterStore } from './counter.js';
import { NewsStore } from '@/store/news.js';

class Store {
  auth;
  counter;
  news;

  constructor() {
    this.auth = new AuthStore();
    this.counter = new CounterStore();
    this.news = new NewsStore();

    makeAutoObservable(this);
  }
}

export default Store;
