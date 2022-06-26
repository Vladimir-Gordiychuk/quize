SELECT quiz.questions.Text
FROM
	quiz.quizquestions
JOIN
    quiz.questions
    ON quizquestions.QuizId = 1 AND quizquestions.QuestionId = questions.Id;

SELECT 
    quizzes.Id as QuizId, questions.Id as QuestionId
FROM
    quiz.quizquestions
JOIN
    quiz.quizzes
JOIN
    quiz.questions
    ON quizzes.Id = quizquestions.QuizId
        AND quizquestions.QuestionId = questions.Id;