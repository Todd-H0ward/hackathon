import { makeAutoObservable, observable, values } from 'mobx';

const mockData = [
  { id: 1, coords: [56.858745, 35.917421], color: 'red' },
  { id: 2, coords: [56.868745, 35.927421], color: 'green' },
  { id: 3, coords: [56.878745, 35.937421], color: 'blue' },
];

const pharmacyData = [
  { id: 1, coords: [56.878745, 35.977421], color: 'blue', type: 'pharmacy' },
  { id: 2, coords: [56.118745, 35.927421], color: 'green', type: 'pharmacy' },
  { id: 3, coords: [56.888745, 35.947421], color: 'yellow', type: 'pharmacy' },
];

export class NewMapStore {
  _markers = observable.map();
  _pharmacy = observable.map();
  _location = observable.array();

  constructor() {
    makeAutoObservable(this);

    mockData.forEach((item) => {
      this.setMarker(item);
    });
    pharmacyData.forEach((item) => {
      this.setPharmacy(item);
    });
    this._location = [56.858745, 35.917421];
  }

  get markers() {
    return values(this._markers);
  }

  get pharmacy() {
    return values(this._pharmacy);
  }

  get location() {
    return values(this._location);
  }

  setMarker(value) {
    this._markers.set(value.id, value);
  }

  setPharmacy(value) {
    this._pharmacy.set(value.id, value);
  }

  setLocation(lat, lng) {
    this._location = [lat, lng];
    localStorage.setItem('lat', lat);
    localStorage.setItem('lng', lng);
  }
}
