import { EMPTY, POST_LIST, SAVED_LIST, USERNAME } from '../Common/CommonConstants';
const INITIAL_STATE = {
    username: EMPTY,
    newsfeedSavedList: [],
    newsfeedPostList: [],
    id: 0
}

const commonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERNAME:
            return { ...state, username: action.payload }
        case SAVED_LIST:
            return { ...state, newsfeedSavedList: action.payload }
        case POST_LIST:
            return {
                ...state,
                newsfeedPostList: [...state.newsfeedPostList, action.payload]
            }
     
        default: return state
    }
}

export default commonReducer