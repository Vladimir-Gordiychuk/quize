import {
    DELETE_QUESTION,
    UPDATE_QUESTION,
    UPDATE_QUESTIONS,
    UPDATE_ATTEMPT,
} from "./types";
import quize from "../apis/quize";
import history from "../history";

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
    history.push(`/questions/${newQuestion.id}`);
};

export const updateQuestion = (question) => async (dispatch) => {
    const newQuestion = await quize.updateQuestion(question);
    dispatch({
        type: UPDATE_QUESTION,
        payload: newQuestion,
    });
    history.push(`/questions`);
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
    //history.push(`/attempts/${attempt.id}`);
};
