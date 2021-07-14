import { EMPTY, SAVED_LIST, USERNAME } from '../Common/CommonConstants';

const INITIAL_STATE = {
    username: EMPTY,
    newsfeedSavedList: []
}

const commonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERNAME:
            return { ...state, username: action.payload, }
        case SAVED_LIST:
            return { ...state, newsfeedSavedList: action.payload }
        default: return state
    }
}

export default commonReducer