insert into quiz.questions (Id, Text) values (1, 'What does the fox say?');
insert into quiz.options (Id, QuestionId, Text, Correct) values (1, 1, 'Auf', TRUE);
insert into quiz.options (Id, QuestionId, Text, Correct) values (2, 1, 'Meu', FALSE);

insert into quiz.questions (Id, Text) values (2, 'What is the RGB color (255, 0, 0)?');
insert into quiz.options (Id, QuestionId, Text, Correct) values (3, 2, 'Red', TRUE);
insert into quiz.options (Id, QuestionId, Text, Correct) values (4, 2, 'Green', FALSE);

insert into quiz.questions (Id, Text) values (3, 'How is the skin color of the white bear?');
insert into quiz.options (Id, QuestionId, Text, Correct) values (5, 3, 'White', FALSE);
insert into quiz.options (Id, QuestionId, Text, Correct) values (6, 3, 'Pink', FALSE);
insert into quiz.options (Id, QuestionId, Text, Correct) values (7, 3, 'Black', TRUE);

insert into quiz.questions (Id, Text) values (4, 'Which of the following are dogs?');
insert into quiz.options (Id, QuestionId, Text, Correct) values (8, 4, 'Mastiff', TRUE);
insert into quiz.options (Id, QuestionId, Text, Correct) values (9, 4, 'Akita', TRUE);
insert into quiz.options (Id, QuestionId, Text, Correct) values (10, 4, 'Subaru', FALSE);

insert into quiz.users (Id, Name) values ('1', 'Vladimir');
insert into quiz.users (Id, Name) values ('2', 'Alice');

insert into quiz.quizzes (Id, AuthorId, Title, Hash, Timelimit)
values (1, '2', 'Wild Life', 123, 600);

insert into quiz.quizquestions (QuizId, QuestionId)
value (1, 1);
insert into quiz.quizquestions (QuizId, QuestionId)
value (1, 3);
insert into quiz.quizquestions (QuizId, QuestionId)
value (1, 4);

insert into quiz.quizzes (Id, AuthorId, Title, Hash, Timelimit)
values (2, '1', 'Computer Graphics', 345, 600);

insert into quiz.quizquestions (QuizId, QuestionId)
value (2, 2);

insert into quiz.attempts (Id, QuizId, UserId, Started, Status)
values (1, 1, '1', '2020-01-01', 1);

/*Question #1 answers (options 1, 2)*/
insert into quiz.attemptdetails (Id, AttemptId, OptionId, Selected)
values (1, 1, 1, TRUE);
insert into quiz.attemptdetails (Id, AttemptId, OptionId, Selected)
values (2, 1, 2, FALSE);

/*Question #2 answers (options 5, 6, 7)*/
insert into quiz.attemptdetails (Id, AttemptId, OptionId, Selected)
values (3, 1, 5, TRUE);
insert into quiz.attemptdetails (Id, AttemptId, OptionId, Selected)
values (4, 1, 6, FALSE);
insert into quiz.attemptdetails (Id, AttemptId, OptionId, Selected)
values (5, 1, 7, FALSE);

/*Question #4 answers (options 8, 9, 10)*/
insert into quiz.attemptdetails (Id, AttemptId, OptionId, Selected)
values (6, 1, 8, TRUE);
insert into quiz.attemptdetails (Id, AttemptId, OptionId, Selected)
values (7, 1, 9, FALSE);
insert into quiz.attemptdetails (Id, AttemptId, OptionId, Selected)
values (8, 1, 10, FALSE);

