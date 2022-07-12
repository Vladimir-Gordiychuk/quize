import _ from "lodash";
import { COMMIT_QUIZ, UPDATE_QUIZ } from "../actions/types";

const emptyQuiz = {
    title: "",
    timeLimit: 300,
    questions: [],
};

export default function newQuizReducer(state = emptyQuiz, action) {
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
