import { UPDATE_ATTEMPT } from "../actions/types";

export default function activeQuizReducer(state = null, action) {
    switch (action.type) {
        case UPDATE_ATTEMPT:
            return action.payload;
        default:
            return state;
    }
}
