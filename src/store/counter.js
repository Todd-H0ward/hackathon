import { makeAutoObservable } from 'mobx';

export class CounterStore {
  _value = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get value() {
    return this._value;
  }

  setValue(newValue) {
    this._value = newValue;
  }

  increment() {
    this.setValue(this.value + 1);
  }

  decrement() {
    this.setValue(this.value + 1);
  }
}
