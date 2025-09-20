import { makeAutoObservable, observable, values } from 'mobx';
import NewsService from '@/api/IncidentsService.js';
import IncidentsService from '@/api/IncidentsService.js';

export class IncidentStore {
  _incidents = observable.map();
  _isLoading = false;
  _minLat = 30;
  _maxLat = 60;
  _minLng = 30;
  _maxLng = 60;
  _since = 0;

  _page = 0;
  _size = 25;
  _totalPages = 0;
  _last = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  get incidents() {
    return values(this._incidents);
  }

  setIsLoading(isLoading) {
    this._isLoading = isLoading;
  }

  setIncidents(incidents) {
    incidents.forEach((incident) => this._incidents.set(incident.id, incident));
  }

  fetchIncidents = async () => {
    this.setIsLoading(true);

    const response = await IncidentsService.fetchIncidents(
      this._minLat,
      this._maxLat,
      this._minLng,
      this._maxLng,
      this._since,
      this._page,
      this._size,
    );

    if ('data' in response) {
      this.setIncidents(response.data.items);
    }

    this.setIsLoading(false);
  };

  loadNextPage = async () => {
    if (this._last) return;
    this._page += 1;
    await this.fetchIncidents();
  };

  resetAndLoad = async () => {
    this._page = 0;
    this._incidents.clear();
    await this.fetchIncidents(false);
  };
}
