import * as httpRequest from 'request-promise';

export class StandardRequest {
  /**
   * @description Standard Http Request
   * @param {any} options
   */
  makeRequest(options: any) {
    return new Promise((resolve, reject) => {
      httpRequest
        .default(options)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}
