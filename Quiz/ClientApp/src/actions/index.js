import {
    DELETE_QUESTION,
    UPDATE_QUESTION,
    UPDATE_QUESTIONS,
    PATCH_ANSWERS,
    UPDATE_ANSWERS,
    UPDATE_CHALLENGE,
    SET_ACTIVE_CHALLENGE,
    RESET_ACTIVE_CHALLENGE,
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

export const fetchLastChallenge = () => async (dispatch) => {
    const challenge = await quize.getLastChallenge();
    if (challenge && challenge.id) {
        dispatch({
            type: UPDATE_CHALLENGE,
            payload: challenge,
        });
        dispatch({
            type: SET_ACTIVE_CHALLENGE,
            payload: challenge,
        });
    }
};

export const fetchChallenge = (id) => async (dispatch) => {
    const challenge = await quize.getChallenge(id);
    if (challenge && challenge.id) {
        dispatch({
            type: UPDATE_CHALLENGE,
            payload: challenge,
        });
    }
};

export const startQuiz = () => async (dispatch) => {
    const challenge = await quize.startQuiz();
    console.log(challenge);
    dispatch({
        type: UPDATE_CHALLENGE,
        payload: challenge,
    });
    dispatch({
        type: SET_ACTIVE_CHALLENGE,
        payload: challenge,
    });
    history.push(routes.getChallengeViewRoute(challenge.id));
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

export const submitAnswers = (challengeId, answers) => async (dispatch) => {
    await quize.submitAnswers(challengeId, answers);
    dispatch({
        type: UPDATE_ANSWERS,
        payload: {},
    });
    dispatch({
        type: RESET_ACTIVE_CHALLENGE,
        payload: null,
    });
};
