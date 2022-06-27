import {
    DELETE_QUESTION,
    UPDATE_QUESTION,
    UPDATE_QUESTIONS,
    UPDATE_ATTEMPT,
    PATCH_ANSWERS,
    UPDATE_ANSWERS,
} from "./types";
import quize from "../apis/quize";
import history from "../history";
import routes from "../routes";

export const fetchQuestions = () => async (dispatch) => {
    const questions = await quize.getQuestions();
    dispatch({
        type: UPDATE_QUESTIONS,
        payload: questions,
    });
};

export const fetchQuestion = (id) => async (dispatch) => {
    const question = await quize.getQuestion(id);
    dispatch({
        type: UPDATE_QUESTION,
        payload: question,
    });
};

export const createQuestion = (question) => async (dispatch) => {
    const newQuestion = await quize.createQuestion(question);
    dispatch({
        type: UPDATE_QUESTION,
        payload: newQuestion,
    });
    history.push(routes.getQuestionViewRoute(newQuestion.id));
};

export const updateQuestion = (question) => async (dispatch) => {
    const newQuestion = await quize.updateQuestion(question);
    dispatch({
        type: UPDATE_QUESTION,
        payload: newQuestion,
    });
    history.push(routes.QUESTION_LIST);
};

export const deleteQuestion = (id) => async (dispatch) => {
    quize.deleteQuestion(id);
    dispatch({
        type: DELETE_QUESTION,
        payload: id,
    });
};

export const startQuiz = () => async (dispatch) => {
    const attempt = await quize.startQuiz();
    console.log(attempt);
    dispatch({
        type: UPDATE_ATTEMPT,
        payload: attempt,
    });
    history.push(routes.getChallengeViewRoute(attempt.id));
};

export const patchAnswers = (answers) => {
    return {
        type: PATCH_ANSWERS,
        payload: answers,
    };
};

export const updateAnswers = (answers) => {
    return {
        type: UPDATE_ANSWERS,
        payload: answers,
    };
};
