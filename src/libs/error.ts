class ErrorBase extends Error {
  public name: string;
  public stack: string;
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export class CreateParamTypeError extends ErrorBase {
  constructor(param, type) {
    super(`Create Function ${param} Paramters ${type} Type Error`);
  }
}

export class CreateWhenError extends ErrorBase {
  constructor(error_message) {
    super(`Create Function Error: ${error_message}`);
  }
}

export class ReadParamTypeError extends ErrorBase {
  constructor(param, type) {
    super(`Read Function ${param} Paramters ${type} Type Error`);
  }
}

export class ReadWhenError extends ErrorBase {
  constructor(error_message) {
    super(`Read Function Error: ${error_message}`);
  }
}

export class UpdateParamTypeError extends ErrorBase {
  constructor(param, type) {
    super(`Update Function ${param} Paramters ${type} Type Error`);
  }
}

export class UpdateWhenError extends ErrorBase {
  constructor(func, error_message) {
    super(`${func} Update Function Error: ${error_message}`);
  }
}

export class DeleteParamTypeError extends ErrorBase {
  constructor(param, type) {
    super(`Delete Function ${param} Paramters ${type} Type Error`);
  }
}

export class DeleteWhenError extends ErrorBase {
  constructor(error_message) {
    super(`Delete Function Error: ${error_message}`);
  }
}

export class InstanceInitError extends ErrorBase {
  constructor(error_message) {
    super(`Init Error: ${error_message}`);
  }
}

export class InstanceExecuteError extends ErrorBase {
  constructor(error_message) {
    super(`Execution Error: ${error_message}`);
  }
}
