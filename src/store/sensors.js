import { makeAutoObservable, observable, values } from 'mobx';
import IncidentsService from '@/api/IncidentsService.js';

export class SensorsStore {
  _sensors = observable.map();
  _isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  get sensors() {
    return values(this._sensors);
  }

  setIsLoading(isLoading) {
    this._isLoading = isLoading;
  }

  setSensors(sensors) {
    sensors.forEach((sensor) => this._sensors.set(sensor.id, sensor));
  }

  fetchSensors = async () => {
    this.setIsLoading(true);

    const response = await IncidentsService.fetchIncidents(
      this.region,
    );

    if ('data' in response) {
      this.setSensors(response.data.items);
    }

    this.setIsLoading(false);
  };
}
