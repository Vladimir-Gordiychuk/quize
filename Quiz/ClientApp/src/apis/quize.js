import axios from "axios";
import authService from "../components/api-authorization/AuthorizeService";

function isBoolean(value) {
    return typeof value === "boolean";
}

function isNumber(value) {
    return typeof value === "number";
}

function isString(value) {
    return typeof value === "string";
}

function isUndefined(value) {
    return typeof value === "undefined";
}

function isNullOrUndefined(value) {
    return value == null;
}

function validateOption({ text, isCorrect }) {
    if (isNullOrUndefined(text))
        throw new Error(
            'Option "text" property must not be null or undefined.'
        );
    if (!isString(text))
        throw new Error('Option "text" property has invalid type.');
    if (!(isUndefined(isCorrect) || isBoolean(isCorrect))) {
        throw new Error('Option "isCorrect" property has invalid type.');
    }
}

function validateQuestion({ text, options }) {
    if (text == null)
        throw new Error(
            'Question "text" property must not be null or undefined.'
        );
    if (typeof text !== "string")
        throw new Error('Question "text" property has invalid type.');
    options.forEach((option) => validateOption(option));
}

const api = axios.create({
    baseURL: "https://localhost:44468/api",
});

export const getQuestions = async () => {
    const response = await api.get("/questions");
    return response.data;
};

/**
 * Get question content using specified id.
 * @param {number} id
 * @returns {{
 * id: number,
 * text: string,
 * options: [
 *  {
 *      id: number
 *      text: string,
 *      correct: boolean
 *  }
 * ]
 * }}
 */
export const getQuestion = async (id) => {
    if (!(isNumber(id) || parseInt(id)))
        throw new Error('Argument "id" must be a number.');
    const response = await api.get(`/questions/${id}`);
    return response.data;
};

/**
 * Post a new question (specifing list of options and correct answers).
 * @param {{
 * test: string,
 * options : [
 *  {
 *  text: string,
 *  correct: boolean
 *  }
 * ]
 * }} question Object describing a question.
 * @returns Returns newly created question object
 * where question and options are going to have ids specified.
 */
export const createQuestion = async (question) => {
    validateQuestion(question);
    const response = await api.post("/questions", question);
    return response.data;
};

export const updateQuestion = async (question) => {
    if (!(isNumber(question.id) || parseInt(question.id)))
        throw new Error('Question "id" property must be a number.');
    validateQuestion(question);
    const response = await api.put(`/questions/${question.id}`, question);
    return response.data;
};

export const deleteQuestion = async (id) => {
    await api.delete(`/questions/${id}`);
};

export const getLastChallenge = async () => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error("Authentification is required.");
    const response = await api.get("/attempts/last", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getChallenge = async (id) => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error("Authentification is required.");
    const response = await api.get(`/attempts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Start a new challenge!
 * @returns {{
 * id: number,
 * start: string,
 * finish: string,
 * quiz: {
 *  id: number,
 *  title: string,
 *  timeLimit: number,
 *  hash: number,
 *  questions: [
 *      {
 *          id: number,
 *          text: string,
 *          options: [
 *              {
 *                  id: option,
 *                  text: string,
 *                  coorect: boolean
 *              }
 *          ]
 *      }
 *  ]
 * }
 * }} Full challenge & quiz data.
 */
export const startQuiz = async () => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error("Authentification is required.");
    const response = await api.post(
        `/attempts`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const getAnswers = async (id) => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error("Authentification is required.");
    const response = await api.get(`/answers/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Submit quiz answers to server.
 * @param {number} id
 * @param {{}} answers A map (key-value pairs) where
 * key is a number = option id and value is boolean = selected or not.
 */
export const submitAnswers = async (id, answers) => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error("Authentification is required.");
    const response = await api.put(
        `/answers/${id}`,
        {
            selected: Object.keys(answers).filter(
                (optionId) => answers[optionId]
            ),
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.status != 204) {
        throw new Error("Bad response.");
    }
};

/**
 * Get challenge results for all attempts made by current user.
 * @returns {
 * [
 * {
 * id : number,
 * status : string,
 * totalQuestions : number,
 * correctAnswers : number
 * }
 * ]
 * }
 */
export const getResults = async () => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error("Authentification is required.");
    const response = await api.get(`/results`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Get challenge results (summary) for specified attempt (challenge) id.
 * @param {number} id Challenge (attempt) id.
 * @returns {{
 * id : number,
 * status : string,
 * totalQuestions : number,
 * correctAnswers : number
 * }}
 */
export const getResult = async (id) => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error("Authentification is required.");
    const response = await api.get(`/results/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Get list of quizzes.
 * @returns {[
 * {
 * id: number,
 * title: string,
 * timeLimit: number,
 * hash: number,
 * questions: [
 *  {
 *      id: number,
 *      text: string,
 *      options: [
 *          {
 *              id: option,
 *              text: string,
 *              coorect: boolean
 *          }
 *      ]
 *  }
 * ]}
 * ]}
 */
export const getQuizzes = async () => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error("Authentification is required.");
    const response = await api.get("/quizzes", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Create new quiz.
 * @param {{ title: string, timeLimit: number, questionIds: [number]}} newQuiz Quiz data.
 * @returns {{
 * id: number,
 * title: string,
 * timeLimit: number,
 * hash: number,
 * questions: [
 *  {
 *      id: number,
 *      text: string,
 *      options: [
 *          {
 *              id: option,
 *              text: string,
 *              coorect: boolean
 *          }
 *      ]
 *  }
 * ]}}
 */
export const createQuiz = async (newQuiz) => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error("Authentification is required.");
    const response = await api.post(`/quizzes`, newQuiz, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

/**
 * Update existing quiz.
 * @param {{ id: number, title: string, timeLimit: number, questionIds: [number]}} quiz Quiz data.
 * @returns {{
 * id: number,
 * title: string,
 * timeLimit: number,
 * hash: number,
 * questions: [
 *  {
 *      id: number,
 *      text: string,
 *      options: [
 *          {
 *              id: option,
 *              text: string,
 *              coorect: boolean
 *          }
 *      ]
 *  }
 * ]}}
 */
export const updateQuiz = async (quiz) => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error("Authentification is required.");
    const response = await api.put(`/quizzes/${quiz.id}`, quiz, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export default {
    api,
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getLastChallenge,
    getChallenge,
    startQuiz,
    getAnswers,
    submitAnswers,
    getResults,
    getResult,
    getQuizzes,
    createQuiz,
    updateQuiz,
};
