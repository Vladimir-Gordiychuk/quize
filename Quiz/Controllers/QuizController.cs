using Microsoft.AspNetCore.Mvc;
using Quiz.Data;
using Quiz.Dtos;
using Quiz.Utils;
using System.Diagnostics;
using System.Security.Claims;

namespace Quiz.Controllers
{
    [Route("api/quizzes")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        readonly ApplicationDbContext _db;
        readonly DtoBuilder _builder;

        // GET: api/<QuizController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
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
        public ActionResult<QuizDto> Post(NewQuizDto newQuiz)
        {
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
                Hash = QuizHelper.Hash(ids)
            };

            throw new NotImplementedException();

        }

        // PUT api/quizzes/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/quizzes/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
