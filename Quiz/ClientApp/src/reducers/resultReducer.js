import { UPDATE_RESULT } from "../actions/types";

export default function resultReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_RESULT:
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        default:
            return state;
    }
}
