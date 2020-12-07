import { Logger } from '@nestjs/common';
import { PythonShell } from 'python-shell';
import * as path from 'path';
PythonShell.defaultOptions = {
  scriptPath: path.resolve(__dirname, '../../address'),
};

/**
 * @description Address Converter
 * @public
 * @param {string} address
 */
export const addressConverter = function(address: string): Promise<any> {
  return new Promise((resolve, reject) => {
    PythonShell.run(
      'main.py',
      { args: [address] },
      (err: Error, result: any[]) => {
        if (err) {
          Logger.log(err.message, 'Address', true);
          return reject(err.message);
        }
        resolve(result);
      },
    );
  });
};
