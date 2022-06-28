import _ from "lodash";
import {
    UPDATE_CHALLENGE,
    SET_ACTIVE_CHALLENGE,
    RESET_ACTIVE_CHALLENGE,
} from "../actions/types";

export default function challengeReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_CHALLENGE:
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        case SET_ACTIVE_CHALLENGE:
            if (state[action.payload.id]) {
                return {
                    ...state,
                    active: action.payload,
                };
            } else {
                console.log(
                    "SET_ACTIVE_CHALLENGE specified unexpected challenge payload."
                );
            }
        case RESET_ACTIVE_CHALLENGE:
            return {
                ...state,
                active: null,
            };
        default:
            return state;
    }
}
