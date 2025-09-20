import { makeAutoObservable } from 'mobx';
import { AuthStore } from './auth.js';
import { CounterStore } from './counter.js';

class Store {
  auth;
  counter;

  constructor() {
    this.auth = new AuthStore();
    this.counter = new CounterStore();

    makeAutoObservable(this);
  }
}

export default Store;
