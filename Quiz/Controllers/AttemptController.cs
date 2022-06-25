using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz.Data;
using Quiz.Dtos;
using Quiz.Models;
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

        public AttemptController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET: api/<AttemptController>
        [HttpGet]
        public IEnumerable<Attempt> Get()
        {
            var userId = GetCurrentUserId();
            return _db.Attempts
                .Where(attempt => attempt.UserId == userId)
                .ToList();
        }

        // GET api/<AttemptController>/5
        [HttpGet("{id}")]
        public ActionResult<Attempt> Get(int id)
        {
            var userId = GetCurrentUserId();
            var target = _db.Attempts.Find(id);
            if (target == null)
                return NotFound();

            if (target.UserId != userId)
            {
                return StatusCode(403, "You are not authorized to access this resourse.");
            }

            return target;
        }

        // POST api/<AttemptController>
        [HttpPost]
        public AttemptDto Post([FromQuery] string? subject)
        {
            var userId = GetCurrentUserId();

            var unfinisedQuizzes = _db.Attempts
                .Where(attempt =>
                    attempt.UserId == userId &&
                    (attempt.Status == (int) AttemptStatus.Started ||
                    attempt.Status == (int)AttemptStatus.Undefined))
                .Include(attempt => attempt.Quiz);

            var now = DateTime.UtcNow;

            bool changed = false;
            foreach (var unfinished in unfinisedQuizzes)
            {
                var expireAt = unfinished.Start.AddSeconds(unfinished.Quiz.TimeLimit);
                if (expireAt > now)
                {
                    changed = true;

                    unfinished.Status = (int) AttemptStatus.Expired;
                    unfinished.Finish = expireAt;
                }
            }
            if (changed)
            {
                _db.SaveChanges();
            }

            var last = unfinisedQuizzes.FirstOrDefault(attempt => attempt.Status == (int)AttemptStatus.Started);
            if (last != null)
            {
                return BuildDto(last);
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

            var questionIds = _db.QuizQuestions
                .Where(quizQuestion => quizQuestion.QuizId == randomQuiz.Id)
                .Select(quizQuestion => quizQuestion.QuestionId)
                .ToList();

            var questions = _db.Questions
                .Where(question => questionIds.Contains(question.Id))
                .ToList();

            var attempt = new Attempt
            {
                QuizId = randomQuiz.Id,
                UserId = GetCurrentUserId(),
                Start = DateTime.UtcNow,
                Finish = null,
                Status = (int)AttemptStatus.Started
            };

            _db.Attempts.Add(attempt);
            _db.SaveChanges();

            return BuildDto(attempt, randomQuiz, questions);
        }

        Models.Quiz GenerateRandomQuiz()
        {
            var questionCount = Math.Min(_db.Questions.Count(), 10);
            var random = new Random();

            var questions = new List<Question>();
            for (int i = 0; i < questionCount; i++)
            {
                var nextIndex = random.Next(questionCount);
                var question = _db.Questions.Skip(nextIndex).First();
                questions.Add(question);
            }

            int hash = Hash(questions.Select(question => question.Id));

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

        int Hash(IEnumerable<int> integers)
        {
            IEnumerator<int> intEnum = integers.GetEnumerator();

            if (intEnum.MoveNext() == false) return 0;

            int hash = 0;
            unchecked
            {
                hash = intEnum.Current.GetHashCode();
                for (; intEnum.MoveNext() == true;)
                    hash = 31 * hash + intEnum.Current.GetHashCode();
            }

            return hash;
        }

        List<QuestionDto> BuildDtos(IEnumerable<Question> questions)
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

        AttemptDto BuildDto(Attempt attempt)
        {
            var quiz = _db.Quizzes.Find(attempt.QuizId);
            if (quiz == null)
                throw new ArgumentException();

            var questionIds = _db.QuizQuestions
                .Where(quizQuestion => quizQuestion.QuizId == quiz.Id)
                .Select(quizQuestion => quizQuestion.QuestionId);

            var questions = _db.Questions
                .Where(question => questionIds.Contains(question.Id));

            return BuildDto(attempt, quiz, questions);
        }

        AttemptDto BuildDto(Attempt attempt, Models.Quiz quiz, IEnumerable<Question> questions)
        {
            var questionDtos = BuildDtos(questions);

            return new AttemptDto {
                Id = attempt.Id,
                Quiz = new QuizDto
                {
                    Id = quiz.Id,
                    Hash = quiz.Hash,
                    Title = quiz.Title,
                    TimeLimit = quiz.TimeLimit,
                    Questions = questionDtos
                }
            };
        }

        // PUT api/<AttemptController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AttemptController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }


        private string GetCurrentUserId()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            Debug.Assert(claimsIdentity != null, "User is required to be logged in.");
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            Debug.Assert(claim != null, "All valid users are supposed to have an Id.");
            return claim.Value;
        }
    }
}
