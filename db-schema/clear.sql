DELETE FROM quiz.users WHERE Id = '1';
DELETE FROM quiz.users WHERE Id = '2';

DELETE FROM quiz.quizzes WHERE Id > 0;

DELETE FROM quiz.questions WHERE Id > 0;