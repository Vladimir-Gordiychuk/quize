import { combineReducers } from "redux";

import questionReducer from "./questionReducer";
import answerReducer from "./answerReducer";
import challengeReducer from "./challengeReducer";
import resultReducer from "./resultReducer";
import quizReducer from "./quizReducer";
import newQuizReducer from "./newQuizReducer";

export default combineReducers({
    questions: questionReducer,
    answers: answerReducer,
    challenges: challengeReducer,
    results: resultReducer,
    quizzes: quizReducer,
    newQuiz: newQuizReducer,
});
