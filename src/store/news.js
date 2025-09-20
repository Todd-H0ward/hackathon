import { makeAutoObservable, observable, values } from 'mobx';
import NewsService from '@/api/NewsService.js';

export class NewsStore {
  _news = observable.map();
  _isLoading = false;
  _region = '';

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  get news() {
    return values(this._news);
  }

  get region() {
    return this._region;
  }

  setIsLoading(isLoading) {
    this._isLoading = isLoading;
  }

  setNews(news) {
    news.forEach((news) => this._news.set(news.id, news));
  }

  setRegion(region) {
    this._region = region;
  }

  fetchNews = async () => {
    this.setIsLoading(true);

    const response = await NewsService.fetchNews(this._region);

    if ('data' in response) {
      this.setNews(response.data);
    }

    this.setIsLoading(false);
  };
}
