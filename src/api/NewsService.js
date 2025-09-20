import { makeRequest } from '@/api/makeRequest.js';

class NewsService {
  fetchNews(region, page) {
    return makeRequest({
      url: `/public/news?region=${region}`,
      params: {
        page,
      },
    });
  }
}

export default new NewsService();
