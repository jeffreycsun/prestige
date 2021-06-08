import { RequiredParamError } from "../errors/RequiredParamError.js";

/**
 * This function is supplied as a default value for arguments.
 * If a RequireParamError is thrown, it's clear we have not supplied a required param.
 *
 */
export function requiredParam(param) {
  throw new RequiredParamError(param);
}
