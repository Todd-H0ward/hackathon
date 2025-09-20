import { makeRequest } from './makeRequest.js';

class AiService {
  chat(prompt) {
    return makeRequest({
      url: 'ai/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { prompt },
    });
  }
  navAsk(question) {
    return makeRequest({
      url: 'nav/ask',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { question },
    });
  }
}

export default new AiService();
