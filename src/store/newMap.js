import { makeAutoObservable, observable, values } from 'mobx';

const mockData = [
  { id: 1, coords: [56.858745, 35.917421], color: 'red' },
  { id: 2, coords: [56.868745, 35.927421], color: 'green' },
  { id: 3, coords: [56.878745, 35.937421], color: 'blue' },
];

export class NewMapStore {
  _markers = observable.map();
  _location = [];

  constructor() {
    makeAutoObservable(this);

    mockData.forEach((item) => {
      this.setMarker(item);
    });
  }

  get markers() {
    return values(this._markers);
  }

  setMarker(value) {
    this._markers.set(value.id, value);
  }
}
