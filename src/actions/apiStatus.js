import { BEGIN_API_CALL, API_CALL_ERROR } from "./types";

export function beginApiCall() {
  return { type: BEGIN_API_CALL };
}

export function apiCallError() {
  return { type: API_CALL_ERROR };
}