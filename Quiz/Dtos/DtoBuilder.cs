using Quiz.Data;
using Quiz.Models;

namespace Quiz.Dtos
{
    public class DtoBuilder
    {
        readonly ApplicationDbContext _db;

        public DtoBuilder(ApplicationDbContext db)
        {
            _db = db;
        }

        public AnswerDto BuildAnswer(Attempt attempt)
        {
            var details = _db.AttemptDetails.Where(detail => detail.AttemptId == attempt.Id);

            return new AnswerDto
            {
                Selected = details
                    .Where(detail => detail.Selected)
                    .Select(detail => detail.OptionId)
                    .ToList()
            };
        }

        /// <summary>
        /// Build a list of QuestionDto quering Options from DB in a single query.
        /// </summary>
        /// <param name="questions">List of question that need their DTOs.</param>
        /// <returns>Returns list of QuiestionDto with their OptionDto included.</returns>
        public List<QuestionDto> BuildQuestions(IEnumerable<Question> questions)
        {
            var questionIds = questions.Select(question => question.Id);
            var options = _db.Options
                .Where(option => questionIds.Contains(option.QuestionId))
                .ToList();

            var dtos = questions.Select(question => new QuestionDto
            {
                Id = question.Id,
                Text = question.Text,
                Options = options
                    .Where(option => option.QuestionId == question.Id)
                    .Select(option => new OptionDto(option))
                    .ToList()
            }).ToList();

            return dtos;
        }

        public AttemptDto BuildAttempt(Attempt attempt)
        {
            var quiz = _db.Quizzes.Find(attempt.QuizId);
            if (quiz == null)
                throw new ArgumentException();

            var questionIds = _db.QuizQuestions
                .Where(quizQuestion => quizQuestion.QuizId == quiz.Id)
                .Select(quizQuestion => quizQuestion.QuestionId);

            var questions = _db.Questions
                .Where(question => questionIds.Contains(question.Id));

            return BuildAttempt(attempt, quiz, questions);
        }

        public QuizDto BuildQuiz(Models.Quiz quiz, IEnumerable<Question> questions)
        {
            return new QuizDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Hash = quiz.Hash,
                TimeLimit = quiz.TimeLimit,
                Questions = BuildQuestions(questions)
            };
        }

        /// <summary>
        /// Build QuizDto fetching questions with a separate querry.
        /// </summary>
        /// <param name="quiz">A Quiz model that should be used to build DTO.</param>
        /// <returns>QuizDto object.</returns>
        public QuizDto BuildQuiz(Models.Quiz quiz)
        {
            var questions = from question in _db.Questions
                            join quizQuestion in _db.QuizQuestions
                            on question.Id equals quizQuestion.QuestionId
                            where quizQuestion.QuizId == quiz.Id
                            select question;

            return BuildQuiz(quiz, questions);
        }

        public AttemptDto BuildAttempt(Attempt attempt, Models.Quiz quiz, IEnumerable<Question> questions)
        {
            var questionDtos = BuildQuestions(questions);

            return new AttemptDto
            {
                Id = attempt.Id,
                Quiz = new QuizDto
                {
                    Id = quiz.Id,
                    Hash = quiz.Hash,
                    Title = quiz.Title,
                    TimeLimit = quiz.TimeLimit,
                    Questions = questionDtos
                },
                Start = attempt.Start,
                Finish = attempt.Finish,
            };
        }

    }

}
