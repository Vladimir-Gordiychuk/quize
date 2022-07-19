using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Quiz.Data;
using Quiz.Dtos;
using Quiz.Utils;

namespace Quiz.Controllers
{
    [Authorize]
    [Route("api/quizzes")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        readonly ApplicationDbContext _db;
        readonly DtoBuilder _builder;

        public QuizController(ApplicationDbContext db)
        {
            _db = db;
            _builder = new DtoBuilder(db);
        }

        // GET: api/<QuizController>
        [HttpGet]
        public ActionResult<List<QuizDto>> Get()
        {
            var userId = this.GetCurrentUserId();

            var quizzes = _db.Quizzes
                .Where(x => x.AuthorId == userId)
                .ToList();

            return quizzes
                .Select(quiz => _builder.BuildQuiz(quiz))
                .ToList();
        }

        // GET api/quizzes/5
        [HttpGet("{id}")]
        public ActionResult<QuizDto> Get(int id)
        {
            var quiz = _db.Quizzes.Find(id);

            if (quiz is null)
            {
                return NotFound();
            }

            var userId = this.GetCurrentUserId();
            if (quiz.AuthorId != userId)
            {
                return Forbid();
            }

            return _builder.BuildQuiz(quiz);
        }

        // POST api/quizzes
        [HttpPost]
        public ActionResult<QuizDto> Post([FromBody]UpdateQuizDto newQuiz)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = this.GetCurrentUserId();

            var ids = newQuiz.QuestionIds.Distinct().ToList();
            ids.Sort();

            var count = _db.Questions.Where(q => ids.Contains(q.Id)).Count();

            if (ids.Count != count)
            {
                // some question ids specified are not valid.
                return BadRequest("Quistion id list contains invalid id.");
            }

            var quiz = new Models.Quiz
            {
                Title = newQuiz.Title,
                AuthorId = userId,
                Hash = QuizHelper.GetQuizHash(ids),
                TimeLimit = newQuiz.TimeLimit
            };

            using (var transaction = _db.Database.BeginTransaction())
            {

                _db.Quizzes.Add(quiz);
                // SaveChanges in order to get quiz Id
                _db.SaveChanges();

                _db.QuizQuestions.AddRange(ids.Select(questionId => new Models.QuizQuestion
                {
                    QuizId = quiz.Id,
                    QuestionId = questionId
                }));

                _db.SaveChanges();
                transaction.Commit();

            }

            return _builder.BuildQuiz(quiz);
        }

        // PUT api/quizzes/5
        [HttpPut("{id}")]
        public ActionResult<QuizDto> Put(int id, [FromBody] UpdateQuizDto quiz)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var target = _db.Quizzes.Find(id);
            if (target == null)
            {
                return NotFound();
            }

            var userId = this.GetCurrentUserId();
            if (target.AuthorId != userId)
            {
                return Forbid();
            }

            var questionIds = (
                from quizQuestion in _db.QuizQuestions
                where quizQuestion.QuizId == target.Id
                select quizQuestion
            )
            .ToList();

            var questionsToRemove = questionIds
                .Where(quizQuestion => !quiz.QuestionIds.Contains(quizQuestion.QuestionId))
                .ToList();

            var questionsToAdd = quiz.QuestionIds
                .Where(id => !questionIds.Any(quizQuestion => quizQuestion.QuestionId == id))
                .Select(questionId => new Models.QuizQuestion
                {
                    QuizId = target.Id,
                    QuestionId = questionId
                })
                .ToList();

            using (var transaction = _db.Database.BeginTransaction())
            {
                target.Title = quiz.Title;
                target.TimeLimit = quiz.TimeLimit;

                _db.QuizQuestions.RemoveRange(questionsToRemove);
                _db.QuizQuestions.AddRange(questionsToAdd);

                _db.SaveChanges();
                transaction.Commit();
            }

            return _builder.BuildQuiz(target);
        }

        // DELETE api/quizzes/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
