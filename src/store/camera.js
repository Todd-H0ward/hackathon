import { makeAutoObservable, observable, values } from 'mobx';
import CameraService from '@/api/CameraService.js';

export class CameraStore {
  _cameras = observable.map();
  _isLoading = false;
  _region = '';

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  get cameras() {
    return values(this._cameras);
  }

  setIsLoading(isLoading) {
    this._isLoading = isLoading;
  }

  setCameras(cameras) {
    cameras.forEach((camera) => {
      this._cameras.set(camera.id, camera);
    });
  }

  fetchCameras = async () => {
    this.setIsLoading(true);

    const response = await CameraService.fetchCameras(this._region);

    console.log(response.data);

    if ('data' in response) {
      this.setCameras(response.data);
    }

    this.setIsLoading(false);
  };
}
