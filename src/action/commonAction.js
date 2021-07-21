import { SAVED_LIST, USERNAME, POST_LIST } from "../Common/CommonConstants";

export const username = (data) => {
  return {
    type: USERNAME,
    payload: data,
  }
}

export const savedList = (data) => {
  return {
    type: SAVED_LIST,
    payload: data
  }
}

export const newsFeedList = (data) => {
  return {
    type: POST_LIST,
    payload: data
  }
}


