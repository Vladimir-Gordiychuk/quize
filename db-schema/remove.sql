/*
	DELETES Question
    dependent Options
		-> dependent AttemptDetails
    dependent QuizQuestions
*/
DELETE FROM quiz.questions WHERE Id = 1;

/*
	DELETES User
    dependent Attempts
		-> dependent AttemptDetails
	dependent Quizzes
		-> dependent QuizQuestions
        -> dependent Attempts
			-> dependent AttemptDetails
*/
DELETE FROM quiz.users WHERE Id = '2';

/*
	DELETES Quiz
    dependent Attempts
		-> dependent AttemptDetails
	dependent QuizQuestions
*/
DELETE FROM quiz.quizzes WHERE Id = 1;
