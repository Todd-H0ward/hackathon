import { makeAutoObservable, observable, values } from 'mobx';
import IncidentsService from '@/api/IncidentsService.js';
import SensorsService from '@/api/SensorsService.js';

export class SensorsStore {
  _sensors = observable.map();
  _isLoading = false;
  _region = 'RU-MOW';

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

    const response = await SensorsService.fetchSensors(this._region);

    if ('data' in response) {
      this.setSensors(response.data);
    }

    this.setIsLoading(false);
  };
}
