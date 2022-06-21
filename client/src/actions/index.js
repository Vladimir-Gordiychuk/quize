import { DELETE_QUESTION, UPDATE_QUESTION, UPDATE_QUESTIONS } from "./types";
import quize from "../apis/quize";

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

export const deleteQuestion = (id) => async (dispatch) => {
    quize.deleteQuestion(id);
    dispatch({
        type: DELETE_QUESTION,
        payload: id,
    });
};
