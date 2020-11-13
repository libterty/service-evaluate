import { StandardRequest } from './http';

export class APIRequestFactory {
  static createRequest(type: string) {
    switch (type) {
      case 'standard':
        return new StandardRequest();
    }
  }
}
