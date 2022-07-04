using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Quiz.Data;
using Quiz.Dtos;
using Quiz.Models;
using Quiz.Utils;

namespace Quiz.Controllers
{
    [Authorize]
    [Route("api/answers")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        readonly ApplicationDbContext _db;

        public AnswerController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET: api/<AnswerController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AnswerController>/5
        [HttpGet("{id}")]
        public ActionResult<AnswerDto> Get(int id)
        {
            var target = _db.Attempts.Find(id);
            if (target is null)
                return NotFound();

            var userId = this.GetCurrentUserId();
            if (target.UserId != userId)
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return BuildDto(target);
        }

        /// <summary>
        /// Submit answers.
        /// PUT api/<AnswerController>/5
        /// </summary>
        /// <param name="id"></param>
        /// <param name="answers"></param>
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] AnswerDto answers)
        {
            var now = DateTime.UtcNow;

            var target = _db.Attempts.Find(id);
            if (target is null)
                return NotFound();

            var userId = this.GetCurrentUserId();
            if (target.UserId != userId)
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            if (target.Status != (int)AttemptStatus.Started)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            var quiz = _db.Quizzes.Find(target.QuizId);
            if (target.Start.AddSeconds(quiz.TimeLimit) < now)
            {
                target.Status = (int)AttemptStatus.Expired;
            }
            else
            {
                var details = answers.Selected.Select(answer => new AttemptDetail
                {
                    AttemptId = target.Id,
                    OptionId = answer,
                    Selected = true
                });

                _db.AttemptDetails.AddRange(details);
                target.Status = (int)AttemptStatus.Submitted;
            }

            _db.SaveChanges();

            return StatusCode(StatusCodes.Status204NoContent);
        }

        // DELETE api/<AnswerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private AnswerDto BuildDto(Attempt attempt)
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
    }
}
