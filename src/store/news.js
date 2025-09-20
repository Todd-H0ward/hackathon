import { makeAutoObservable, observable, values } from 'mobx';

export class NewsStore {
  _news = observable.map();
  _isLoading = false;

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
}
