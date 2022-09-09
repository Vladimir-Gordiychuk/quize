import _ from "lodash";
import { UPDATE_RESULT, UPDATE_RESULTS } from "../actions/types";

export default function resultReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_RESULTS:
            // Assuming that action payload is an array.
            return _.mapKeys(action.payload, "id");
        case UPDATE_RESULT:
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        default:
            return state;
    }
}
