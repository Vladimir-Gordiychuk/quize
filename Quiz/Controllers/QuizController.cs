using Microsoft.AspNetCore.Mvc;
using Quiz.Data;
using Quiz.Dtos;
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

            var userId = GetCurrentUserId();
            if (quiz.AuthorId != userId)
            {
                return Forbid();
            }

            return _builder.BuildQuiz(quiz);
        }

        // POST api/quizzes
        [HttpPost]
        public void Post(NewQuizDto newQuiz)
        {
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
