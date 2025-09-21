import { makeRequest } from '@/api/makeRequest.js';

class CameraService {
  fetchCameras() {
    return makeRequest({
      url: `/public/cameras`,
    });
  }
}

export default new CameraService();
