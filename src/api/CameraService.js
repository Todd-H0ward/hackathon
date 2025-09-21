import { makeRequest } from '@/api/makeRequest.js';

class CameraService {
  fetchCameras(region) {
    return makeRequest({
      url: `/public/cameras?region=${region}`,
    });
  }
}

export default new CameraService();
