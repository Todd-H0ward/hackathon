import { makeAutoObservable } from 'mobx';
import AuthService from '../api/AuthService.js';

export class AuthStore {
  _account = null;
  _isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuth() {
    return !!this._account;
  }

  get account() {
    return this._account;
  }

  get isLoading() {
    return this._isLoading;
  }

  setAccount(account) {
    this._account = account;
  }

  setIsLoading(isLoading) {
    this._isLoading = isLoading;
  }

  getProfile = async () => {
    this.setIsLoading(true);
    const response = await AuthService.profile();

    if ('data' in response) {
      this.setAccount(response.data);
    }

    this.setIsLoading(false);
  };

  register = async (user) => {
    const response = await AuthService.register(user);

    if ('data' in response) {
      localStorage.setItem('accessToken', response.data.accessToken);
      await this.getProfile();
    } else {
      this.setAccount(null);
      localStorage.clear();
    }

    return response;
  };

  login = async (user) => {
    const response = await AuthService.login(user);

    if ('data' in response) {
      localStorage.setItem('accessToken', response.data.accessToken);
      await this.getProfile();
    } else {
      this.setAccount(null);
      localStorage.clear();
    }

    return response;
  };

  resetPassword = async (email) => {
    return AuthService.resetPassword(email);
  };

  logout = () => {
    this.setAccount(null);
    localStorage.clear();
  };
}
