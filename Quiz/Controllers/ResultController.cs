using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Quiz.Data;
using Quiz.Dtos;
using Quiz.Models;
using System.Diagnostics;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Quiz.Controllers
{
    [Authorize]
    [Route("api/results")]
    [ApiController]
    public class ResultController : ControllerBase
    {
        readonly ApplicationDbContext _db;

        public ResultController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET: api/<ResultController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ResultController>/5
        [HttpGet("{id}")]
        public ActionResult<ResultDto> Get(int id)
        {
            var target = _db.Attempts.Find(id);
            if (target is null)
                return NotFound();

            var userId = GetCurrentUserId();
            if (target.UserId != userId)
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            if (target.Status != (int)AttemptStatus.Submited)
            {
                return new ResultDto
                {
                    Id = target.Id,
                    Status = ((AttemptStatus)target.Status).ToString(),
                    TotalQuestions = 0,
                    CorrectAnswers = 0,
                };
            }

            var questions = (
                from question in _db.Questions
                join quizQuestion in _db.QuizQuestions
                on question.Id equals quizQuestion.QuestionId
                where quizQuestion.QuizId == target.Id
                select question
                )
                .ToList();

            var questionIds = questions.Select(x => x.Id).ToList();

            var options = _db.Options
                          .Where(option => questionIds.Contains(option.Id))
                          .ToList();

            var selectedOptions = new SortedSet<int>(
                _db.AttemptDetails
                    .Where(detail => detail.AttemptId == target.Id && detail.Selected)
                    .Select(x => x.Id)
                );

            int correctCount = 0;
            foreach (var question in questions)
            {
                var correctOptions = 
                    new SortedSet<int>(
                        options
                            .Where(option => option.QuestionId == question.Id)
                            .Select(option => option.Id)
                    );

                if (correctOptions.IsSubsetOf(selectedOptions) && correctOptions.IsSupersetOf(selectedOptions))
                    ++correctCount;
            }

            return new ResultDto
            {
                Id = target.Id,
                TotalQuestions = questions.Count,
                CorrectAnswers = correctCount,
                Status = "Submited"
            };
        }

        // POST api/<ResultController>
        [HttpPost]
        public void Post([FromBody] string value)
        {

        }

        // PUT api/<ResultController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ResultController>/5
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
