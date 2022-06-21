import axios from "axios";

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
    baseURL: "http://localhost:3001",
});

export const getQuestions = async () => {
    const response = await api.get("/questions");
    return response.data;
};

export const getQuestion = async (id) => {
    if (!(isNumber(id) || parseInt(id)))
        throw new Error('Argument "id" must be a number.');
    const response = await api.get(`/questions/${id}`);
    return response.data;
};

export const createQuestion = async (question) => {
    validateQuestion(question);
    const response = await api.post("/questions", question);
    return response.data;
};

export const updateQuestion = async (question) => {
    if (!isNumber(question.id))
        throw new Error('Question "id" property must be a number.');
    validateQuestion(question);
    const response = await api.put(`/questions/${question.id}`, question);
    return response.data;
};

export default {
    api,
    getQuestions,
    getQuestion,
};
