import { combineReducers } from "redux";
import attemptReducer from "./activeQuizReducer";
import questionReducer from "./questionReducer";
import answerReducer from "./answerReducer";

export default combineReducers({
    questions: questionReducer,
    activeQuiz: attemptReducer,
    answers: answerReducer,
});
