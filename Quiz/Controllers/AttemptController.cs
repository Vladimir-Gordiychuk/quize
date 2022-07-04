using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz.Data;
using Quiz.Dtos;
using Quiz.Models;
using Quiz.Utils;
using System.Diagnostics;
using System.Security.Claims;

namespace Quiz.Controllers
{
    [Authorize]
    [Route("api/attempts")]
    [ApiController]
    public class AttemptController : ControllerBase
    {
        readonly ApplicationDbContext _db;
        readonly DtoBuilder _builder;

        public AttemptController(ApplicationDbContext db)
        {
            _db = db;
            _builder = new DtoBuilder(db);
        }

        // GET: api/<AttemptController>
        [HttpGet]
        public IEnumerable<Attempt> Get()
        {
            var userId = this.GetCurrentUserId();
            return _db.Attempts
                .Where(attempt => attempt.UserId == userId)
                .ToList();
        }

        // GET api/<AttemptController>/5
        [HttpGet("{id}")]
        public ActionResult<AttemptDto> Get(int id)
        {
            var userId = this.GetCurrentUserId();
            var target = _db.Attempts.Find(id);
            if (target == null)
                return NotFound();

            if (target.UserId != userId)
            {
                return StatusCode(403, "You are not authorized to access this resourse.");
            }

            return _builder.BuildAttempt(target);
        }

        Attempt? GetActiveAttempt(string userId)
        {
            var query = _db.Attempts
                .Where(attempt =>
                    attempt.UserId == userId &&
                    (attempt.Status == (int)AttemptStatus.Started ||
                    attempt.Status == (int)AttemptStatus.Undefined))
                .Include(attempt => attempt.Quiz);

            var now = DateTime.UtcNow;

            bool changed = false;
            Attempt? active = null;
            foreach (var unfinished in query)
            {
                var expireAt = unfinished.Start.AddSeconds(unfinished.Quiz.TimeLimit);
                if (expireAt < now)
                {
                    changed = true;

                    unfinished.Status = (int)AttemptStatus.Expired;
                    unfinished.Finish = expireAt;
                }
                else
                {
                    active = unfinished;
                }
            }
            if (changed)
            {
                _db.SaveChanges();
            }

            return active;
        }

        [HttpGet]
        [Route("last")]
        public AttemptDto? Last()
        {
            var userId = this.GetCurrentUserId();
            var active = GetActiveAttempt(userId);
            if (active != null)
            {
                return _builder.BuildAttempt(active);
            }
            return null;
        }

        // POST api/<AttemptController>
        [HttpPost]
        public AttemptDto Post([FromQuery] string? subject)
        {
            var userId = this.GetCurrentUserId();

            var active = GetActiveAttempt(userId);
            if (active != null)
            {
                return _builder.BuildAttempt(active);
            }

            Models.Quiz? randomQuiz = null;
            if (_db.Quizzes.Count() < 3)
            {
                randomQuiz = GenerateRandomQuiz();
            }
            else
            {
                var random = new Random();
                var randomQuizIndex = random.Next(_db.Quizzes.Count());
                randomQuiz = _db.Quizzes.Skip(randomQuizIndex).First();
            }

            var questions = from question in _db.Questions
                            join quizQuestion in _db.QuizQuestions
                            on question.Id equals quizQuestion.QuestionId
                            where quizQuestion.QuizId == randomQuiz.Id
                            select question;

            var attempt = new Attempt
            {
                QuizId = randomQuiz.Id,
                UserId = this.GetCurrentUserId(),
                Start = DateTime.UtcNow,
                Finish = null,
                Status = (int)AttemptStatus.Started
            };

            _db.Attempts.Add(attempt);
            _db.SaveChanges();

            return _builder.BuildAttempt(attempt, randomQuiz, questions);
        }

        IEnumerable<int> GenerateUniqueNumbers(int min, int max, int count)
        {
            var random = new Random();
            var numbers = new SortedSet<int>();

            var range = max - min;
            if (count < range)
            {
                throw new ArgumentException();
            }

            bool flip = ((float)count / (float)range > 0.5);

            while (numbers.Count < count)
            {
                var number = random.Next(min, max);
                if (numbers.Contains(number))
                {
                    numbers.Add(number);
                }
            }

            if (flip)
            {
                return new SortedSet<int>(Enumerable.Range(min, range))
                    .Except(numbers);
            }
            return numbers;
        }

        Models.Quiz GenerateRandomQuiz()
        {
            var totalQuestionCount = _db.Questions.Count();
            var questionCount = Math.Min(totalQuestionCount, 10);

            var indices = GenerateUniqueNumbers(0, totalQuestionCount, questionCount);

            var questions = new List<Question>();
            foreach (var index in indices)
            {
                var question = _db.Questions.Skip(index).First();
                questions.Add(question);
            }

            int hash = QuizHelper.Hash(questions.Select(question => question.Id));

            var quiz = new Models.Quiz
            {
                AuthorId = null,
                TimeLimit = questionCount * 60,
                Title = $"Random Generated Quiz #{hash}",
                Hash = hash
            };

            _db.Quizzes.Add(quiz);
            _db.SaveChanges();

            _db.QuizQuestions.AddRange(
                questions.Select(question => new QuizQuestion
                {
                    QuizId = quiz.Id,
                    QuestionId = question.Id
                }));

            _db.SaveChanges();

            return quiz;
        }
    }
}
