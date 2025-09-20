import { makeRequest } from '@/api/makeRequest.js';

class IncidentsService {
  fetchIncidents(minLat, maxLat, minLng, maxLng, since) {
    return makeRequest({
      url: '/public/incidents',
      params: {
        minLat,
        maxLat,
        minLng,
        maxLng,
        since,
      },
    });
  }
}

export default new IncidentsService();
