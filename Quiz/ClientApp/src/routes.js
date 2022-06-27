const routes = {
    QUESTION_LIST: "/questions",
    QUESTION_NEW: "/questions/new",

    QUESTION_VIEW: "/questions/:id",
    getQuestionViewRoute: (id) => `/questions/${id}`,

    QUESTION_EDIT: "/questions/:id/edit",
    QUESTION_DELETE: "/questions/:id/delete",

    CHALLENGE_LIST: "/challenges",
    CHALLENGE_NEW: "/",
    CHALLENGE_VIEW: "/challenges/:id",
    getChallengeViewRoute: (id) => `/challenges/${id}`,

    results: "/results",
};

export default routes;
