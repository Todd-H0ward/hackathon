import { makeAutoObservable, observable, values } from 'mobx';
import NewsService from '@/api/IncidentsService.js';
import MapService from '@/api/MapService.js';

export class NewMapStore {
  _places = observable.map();
  _location = observable.array();
  _isLoading = false;

  constructor() {
    makeAutoObservable(this);

    this._location = [56.858745, 35.917421];
  }

  get places() {
    return values(this._places);
  }

  get location() {
    return values(this._location);
  }

  get isLoading() {
    return this._isLoading;
  }

  setPlace(value) {
    this._places.set(value.id, value);
  }

  setIsLoading(value) {
    this._isLoading = value;
  }

  setLocation(lat, lng) {
    this._location = [lat, lng];
    localStorage.setItem('lat', lat);
    localStorage.setItem('lng', lng);
  }

  fetchPlaces = async () => {
    this.setIsLoading(true);

    const response = await MapService.fetchPlaces('RU-MOW');

    if ('data' in response) {
      response.data.items.forEach((place) => {
        this.setPlace(place);
      });
    }
    this.setIsLoading(false);
  };
}
