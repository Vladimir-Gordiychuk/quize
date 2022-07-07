import _ from "lodash";
import { COMMIT_QUIZ, UPDATE_QUIZ } from "../actions/types";

export default function newQuizReducer(state = {}, action) {
    switch (action.type) {
        case COMMIT_QUIZ:
            // Reset new quiz state.
            return {};
        case UPDATE_QUIZ:
            if (action.payload.id === undefined) {
                return action.payload;
            }
            return state;
        default:
            return state;
    }
}
