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
 * Payload is an object of the following format:
 * {
 * id : number,
 * status : string,
 * totalQuestions : number,
 * correctAnswers : number
 * }
 */
export const UPDATE_RESULT = "UPDATE_RESULT";
