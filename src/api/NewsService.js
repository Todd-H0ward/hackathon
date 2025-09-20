import { makeRequest } from '@/api/makeRequest.js';

class NewsService {
  fetchNews(minLat, maxLat, minLng, maxLng, since) {
    return makeRequest({
      url: '/node-c/api/public/incidents',
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

export default new NewsService();
