import { makeRequest } from '@/api/makeRequest.js';

class IncidentsService {
  fetchIncidents(minLat, maxLat, minLng, maxLng, since, page) {
    return makeRequest({
      url: '/public/incidents',
      params: {
        minLat,
        maxLat,
        minLng,
        maxLng,
        since,
        page,
      },
    });
  }
}

export default new IncidentsService();
