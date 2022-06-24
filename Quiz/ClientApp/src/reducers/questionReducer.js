import {
    UPDATE_QUESTIONS,
    UPDATE_QUESTION,
    DELETE_QUESTION,
} from "../actions/types";
import _ from "lodash";

export default function questionReducer(questions = {}, action) {
    switch (action.type) {
        case UPDATE_QUESTIONS:
            return _.mapKeys(action.payload, "id");
        case UPDATE_QUESTION:
            return {
                ...questions,
                [action.payload.id]: action.payload,
            };
        case DELETE_QUESTION:
            return _.omit(questions, action.payload);
        default:
            return questions;
    }
}
