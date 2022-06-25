import { combineReducers } from "redux";
import attemptReducer from "./activeQuizReducer";
import questionReducer from "./questionReducer";

export default combineReducers({
    questions: questionReducer,
    activeQuiz: attemptReducer,
});
