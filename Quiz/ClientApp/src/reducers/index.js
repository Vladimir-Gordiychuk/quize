import { combineReducers } from "redux";

import questionReducer from "./questionReducer";
import answerReducer from "./answerReducer";
import challengeReducer from "./challengeReducer";

export default combineReducers({
    questions: questionReducer,
    answers: answerReducer,
    challenges: challengeReducer,
});
