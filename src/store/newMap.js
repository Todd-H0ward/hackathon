import { makeAutoObservable, observable, values } from 'mobx';
import NewsService from '@/api/IncidentsService.js';
import MapService from '@/api/MapService.js';
import { IncidentStore } from '@/store/incidents.js';

export class NewMapStore {
  _places = observable.map();
  _location = observable.array([56.858745, 35.917421]);
  _zoom = 10;
  _isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get places() {
    return values(this._places);
  }

  get location() {
    return values(this._location);
  }

  get zoom() {
    return this._zoom;
  }

  get isLoading() {
    return this._isLoading;
  }

  setPlace(value) {
    this._places.set(value.id, value);
  }

  setPlaces(places) {
    places.forEach((place) => {
      this.setPlace(place);
    });
  }

  setIsLoading(value) {
    this._isLoading = value;
  }

  setZoom(zoom) {
    this._zoom = zoom;
  }

  setLocation = (lat, lng) => {
    this._location.replace([lat, lng]);
  };

  fetchPlaces = async () => {
    this.setIsLoading(true);

    const response = await MapService.fetchPlaces('RU-MOW');

    if ('data' in response) {
      this.setPlaces(response.data.items);
    }

    this.setIsLoading(false);
  };
}
