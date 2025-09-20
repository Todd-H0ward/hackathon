import { makeRequest } from '@/api/makeRequest.js';

class MapService {
  fetchPlaces(region) {
    return makeRequest({
      url: '/public/places',
      params: {
        region,
      },
    });
  }
}

export default new MapService();
