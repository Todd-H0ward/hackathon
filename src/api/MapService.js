import { makeRequest } from '@/api/makeRequest.js';

class MapService {
  fetchPlaces(region) {
    return makeRequest({
      url: '/node-a/api/public/places',
      params: {
        region,
      },
    });
  }
}

export default new MapService();
