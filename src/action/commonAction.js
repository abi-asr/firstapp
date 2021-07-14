import { SAVED_LIST, USERNAME } from "../Common/CommonConstants";

export const username = (data) => {
  return {
    type: USERNAME,
    payload: data,
  }
}

export const savedList = (data) => {
  return {
    type: SAVED_LIST,
    payload:data
  }
}