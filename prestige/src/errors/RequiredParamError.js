export class RequiredParamError extends Error {
  constructor(param) {
    super(`Required parameter "${param}" is missing.`);
  }
}
