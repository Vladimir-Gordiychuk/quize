import { PATCH_ANSWERS, UPDATE_ANSWERS } from "../actions/types";

export default function answerReducer(state = {}, action) {
    switch (action.type) {
        case PATCH_ANSWERS:
            return {
                ...state,
                ...action.payload,
            };
        case UPDATE_ANSWERS:
            return action.payload;
        default:
            return state;
    }
}
