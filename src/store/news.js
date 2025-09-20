import { makeAutoObservable, observable, values } from 'mobx';
import NewsService from '@/api/NewsService.js';

export class NewsStore {
  _news = observable.map();
  _isLoading = false;
  _region = '';
  _page = 0;
  _size = 25;
  _totalPages = 0;
  _last = false;

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

    const response = await NewsService.fetchNews(this._region, this._page);

    if ('data' in response) {
      this.setNews(response.data.items);
    }

    this.setIsLoading(false);
  };

  loadNextPage = async () => {
    if (this._last) return;
    this._page += 1;
    await this.fetchNews();
  };
}
