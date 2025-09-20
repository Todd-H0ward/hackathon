import { makeAutoObservable, observable, values } from 'mobx';
import NewsService from '@/api/NewsService.js';

export class NewsStore {
  _news = observable.map();
  _isLoading = false;
  _minLat = 55;
  _maxLat = 57;
  _minLng = 36;
  _maxLng = 38;
  _since = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  get news() {
    return values(this._news);
  }

  setIsLoading(isLoading) {
    this._isLoading = isLoading;
  }

  setNews(news) {
    news.forEach((newsItem) => this._news.set(newsItem.id, newsItem));
  }

  fetchNews = async () => {
    this.setIsLoading(true);

    const response = await NewsService.fetchNews(
      this._minLat,
      this._maxLat,
      this._minLng,
      this._maxLng,
      this._since,
    );

    if ('data' in response) {
      this.setNews(response.data);
    }

    this.setIsLoading(false);
  };
}
