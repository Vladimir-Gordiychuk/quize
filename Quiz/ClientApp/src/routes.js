const routes = {
    QUESTION_LIST: "/questions",
    QUESTION_NEW: "/questions/new",

    QUESTION_VIEW: "/questions/:id",
    getQuestionViewRoute: (id) => `/questions/${id}`,

    QUESTION_EDIT: "/questions/:id/edit",
    QUESTION_DELETE: "/questions/:id/delete",

    CHALLENGE_LIST: "/challenges",
    CHALLENGE_NEW: "/",
    CHALLENGE_VIEW: "/challenges/:id/:page",
    getChallengeViewRoute: (id, page) => `/challenges/${id}/${page || 0}`,

    RESULT_LIST: "/results",
    RESULT_VIEW: "/results/:id",
    getResultViewRoute: (id) => `/results/${id}`,

    QUIZ_LIST: "/quizzes",
    QUIZ_NEW: "/quizzes/new",
    QUIZ_EDIT: "/quizzes/edit/:id",
    getQuizEditRoute: (id) => `/quizzes/edit/${id}`,
};

export default routes;
