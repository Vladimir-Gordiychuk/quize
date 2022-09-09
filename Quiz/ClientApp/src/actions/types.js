/**
 * Update all question records discarding any exising record (full update).
 */
export const UPDATE_QUESTIONS = "UPDATE_QUESTIONS";
/**
 * Add new or update existing question record.
 */
export const UPDATE_QUESTION = "UPDATE_QUESTION";
/**
 * Delete question record.
 */
export const DELETE_QUESTION = "DELETE_QUESTION";

/**
 * Update currently active quize attempt.
 */
export const UPDATE_CHALLENGE = "UPDATE_CHALLENGE";

/**
 * Set id for currently active challenge.
 */
export const SET_ACTIVE_CHALLENGE = "SET_ACTIVE_CHALLENGE";

export const RESET_ACTIVE_CHALLENGE = "RESET_ACTIVE_CHALLENGE";

export const PATCH_ANSWERS = "PATCH_ANSWERS";

export const UPDATE_ANSWERS = "SUBMIT_ANSWERS";

/**
 * Payload is an array of objects of the following format:
 * [
 *   {
 *     id : number,
 *     status : string,
 *     totalQuestions : number,
 *     correctAnswers : number
 *   }
 * ]
 */
export const UPDATE_RESULTS = "UPDATE_RESULTS";

/**
 * Payload is an object of the following format:
 * {
 * id : number,
 * status : string,
 * totalQuestions : number,
 * correctAnswers : number
 * }
 */
export const UPDATE_RESULT = "UPDATE_RESULT";

/**
 * Fetch list of my quizzes.
 */
export const FETCH_QUIZZES = "FETCH_QUIZZES";

/**
 * Action.payload is a full-price quiz object with a valid id.
 * Put this newly created quiz to a map of quizzes
 * and reset 'new' quiz state (the one that was in design mode).
 */
export const COMMIT_QUIZ = "COMMIT_QUIZ";

/**
 * Update specific quiz in the redux store.
 * If action.payload.id is not specified -
 * update the 'new' quiz (the one that is in design mode).
 */
export const UPDATE_QUIZ = "UPDATE_QUIZ";
