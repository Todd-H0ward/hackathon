import { makeRequest } from './makeRequest.js';

class AuthService {
  login(user) {
    return makeRequest({
      url: 'auth/login',
      method: 'POST',
      data: user,
    });
  }

  register(user) {
    return makeRequest({
      url: 'auth/register',
      method: 'POST',
      data: user,
    });
  }

  resetPassword(email) {
    return makeRequest({
      url: "auth/password/reset",
      method: 'POST',
      data: email,
    })
  }

  profile() {
    return makeRequest({
      url: 'users/me',
    });
  }
}

export default new AuthService();
