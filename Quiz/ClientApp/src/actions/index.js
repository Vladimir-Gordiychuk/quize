import {
    DELETE_QUESTION,
    UPDATE_QUESTION,
    UPDATE_QUESTIONS,
    PATCH_ANSWERS,
    UPDATE_ANSWERS,
    UPDATE_CHALLENGE,
    SET_ACTIVE_CHALLENGE,
    RESET_ACTIVE_CHALLENGE,
    UPDATE_RESULT,
    FETCH_QUIZZES,
    COMMIT_QUIZ,
    UPDATE_QUIZ,
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
    history.push(routes.getResultViewRoute(challengeId));
};

export const fetchResult = (id) => async (dispatch) => {
    const result = await quize.getResult(id);
    dispatch({
        type: UPDATE_RESULT,
        payload: result,
    });
};

export const fetchQuizzes = () => async (dispatch) => {
    const quizzes = await quize.getQuizzes();
    dispatch({
        type: FETCH_QUIZZES,
        payload: quizzes,
    });
};

/**
 * POST new quiz to server, retrive id for newly created quiz
 * and set this id for a new quiz.
 * @param {{ title: string, timeLimit: number, questionIds: [number]}} newQuiz Quiz data.
 */
export const createQuiz = (newQuiz) => async (dispatch) => {
    const quiz = await quize.createQuiz(newQuiz);
    dispatch({
        type: COMMIT_QUIZ,
        payload: quiz,
    });
    history.push(routes.getQuizEditRoute(quiz.id));
};

/**
 * PUT updated data for existing quiz to server.
 * @param {{ id: number, title: string, timeLimit: number, questionIds: [number]}} quiz Quiz data.
 */
export const updateQuiz = (quiz) => async (dispatch) => {
    const updatedQuiz = await quize.updateQuiz(quiz);
    dispatch({
        type: UPDATE_QUIZ,
        payload: updatedQuiz,
    });
};
