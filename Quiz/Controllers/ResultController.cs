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

            var userId = this.GetCurrentUserId();
            if (target.UserId != userId)
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            if (target.Status != (int)AttemptStatus.Submitted)
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
                where quizQuestion.QuizId == target.QuizId
                select question
                )
                .ToList();

            var questionIds = questions.Select(x => x.Id).ToList();

            var options = _db.Options
                          .Where(option => questionIds.Contains(option.QuestionId))
                          .ToList();

            var selectedOptions = _db.AttemptDetails
                    .Where(detail => detail.AttemptId == target.Id && detail.Selected)
                    .Include(detail => detail.Option)
                    .Select(detail => detail.Option);

            int correctCount = 0;
            foreach (var question in questions)
            {
                var correctOptions = 
                    new SortedSet<int>(
                        options
                            .Where(option => option.QuestionId == question.Id && option.Correct)
                            .Select(option => option.Id)
                    );

                var answers = selectedOptions
                    .Where(option => option.QuestionId == question.Id)
                    .Select(option => option.Id)
                    .ToList();

                if (correctOptions.IsSubsetOf(answers) && correctOptions.IsSupersetOf(answers))
                    ++correctCount;
            }

            return new ResultDto
            {
                Id = target.Id,
                TotalQuestions = questions.Count,
                CorrectAnswers = correctCount,
                Status = AttemptStatus.Submitted.ToString()
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
    }
}
