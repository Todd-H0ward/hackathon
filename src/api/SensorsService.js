import { makeRequest } from '@/api/makeRequest.js';

class SensorsService {
  fetchSensors(region) {
    return makeRequest({
      url: '/public/sensors',
      params: {
        region
      },
    });
  }
}

export default new SensorsService();
