import { makeRequest } from '@/api/makeRequest.js';

class NewsService {
  fetchNews(region) {
    return makeRequest({
      url: `/public/news?region=${region}`,
    });
  }
}

export default new NewsService();
