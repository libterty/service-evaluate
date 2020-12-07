import { StandardRequest } from './http';

export class APIRequestFactory {
  /**
   * @description Create Request
   * @param {"standard"} type
   */
  static createRequest(type: 'standard') {
    switch (type) {
      case 'standard':
        return new StandardRequest();
    }
  }
}
