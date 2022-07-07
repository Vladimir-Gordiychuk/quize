import _ from "lodash";
import { FETCH_QUIZZES, COMMIT_QUIZ, UPDATE_QUIZ } from "../actions/types";

export default function quizReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_QUIZZES:
            // Assuming that action payload is an array.
            return _.mapKeys(action.payload, "id");
        case COMMIT_QUIZ:
        case UPDATE_QUIZ:
            if (action.payload.id === undefined) return state;

            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        default:
            return state;
    }
}
