using Microsoft.AspNetCore.Mvc;
using Quiz.Data;
using Quiz.Dtos;
using Quiz.Models;
using System.Diagnostics;

namespace Quiz.Controllers
{
    [Route("api/questions")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        readonly ApplicationDbContext _db;

        public QuestionController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET: api/<QuestionController>
        [HttpGet]
        public IEnumerable<QuestionDto> Get()
        {
            return _db.Questions.Select(
                (question) => new QuestionDto
                {
                    Id = question.Id,
                    Text = question.Text,
                    Options = _db.Options
                        .Where(option => option.QuestionId == question.Id)
                        .Select(option => new OptionDto {
                            Text = option.Text,
                            Correct = option.Correct
                        })
                        .ToList()
                });
        }

        // GET api/<QuestionController>/5
        [HttpGet("{id}")]
        public QuestionDto? Get(int id)
        {
            var target = _db.Questions.Find(id);
            if (target == null)
            {
                return null;
            }

            return new QuestionDto
            {
                Id = target.Id,
                Text = target.Text,
                Options = _db.Options
                    .Where(option => option.QuestionId == id)
                    .Select(option => new OptionDto
                    {
                        Text = option.Text,
                        Correct = option.Correct
                    })
                    .ToList()
            };
        }

        // POST api/<QuestionController>
        [HttpPost]
        public QuestionDto Post([FromBody] QuestionDto question)
        {
            var options = question.Options;

            var newQuestion = new Question
            {
                Text = question.Text
            };
            _db.Questions.Add(newQuestion);
            _db.SaveChanges();

            var newOptions = question.Options.Select(option =>
                new Option
                {
                    QuestionId = newQuestion.Id,
                    Text = option.Text,
                    Correct = option.Correct,
                });

            _db.Options.AddRange(newOptions);
            _db.SaveChanges();

            return new QuestionDto {
                Id = newQuestion.Id,
                Text = newQuestion.Text,
                Options = newOptions
                    .Select(option => new OptionDto(option))
                    .ToList()
            };
        }

        // PUT api/<QuestionController>/5
        [HttpPut("{id}")]
        public ActionResult<QuestionDto> Put(int id, [FromBody] QuestionDto question)
        {
            var target = _db.Questions.Find(id);
            if (target is null)
            {
                return NotFound();
            }

            var incomingOptionIds = question.Options.Select(option => option.Id);

            var currentOptions = _db.Options
                .Where(option => option.QuestionId == id)
                .ToList();
            
            // If incoming structure contains invalid option references,
            // return bad request.
            if (incomingOptionIds.Any(id => id.HasValue && !currentOptions.Any(option => option.Id == id.Value)))
            {
                return BadRequest(new
                {
                    error = "Invalid option id (option with specified id is not bound to specified question)."
                });
            }

            target.Text = question.Text;

            var finalOptions = new List<Option>();
            foreach (var inputOption in question.Options)
            {
                if (inputOption.Id.HasValue)
                {
                    // Find and update corresponding record.

                    var option = currentOptions.Find(option => option.Id == inputOption.Id);
                    Debug.Assert(option != null, "This check was alredy performed (see BadRequest response).");

                    option.Text = inputOption.Text;
                    option.Correct = inputOption.Correct;

                    finalOptions.Add(option);
                }
                else
                {
                    var newOption = new Option
                    {
                        Text = inputOption.Text,
                        Correct = inputOption.Correct,
                    };

                    _db.Options.Add(newOption);

                    // create a new option.
                    finalOptions.Add(newOption);
                }
            }

            var removedOptions = currentOptions
                .Where(option => !incomingOptionIds.Contains(option.Id));

            _db.Options.RemoveRange(removedOptions);

            _db.SaveChanges();

            // When SaveChanges is performed,
            // each new item in final options list
            // should get a valid Id.

            return new QuestionDto
            {
                Id = target.Id,
                Text = target.Text,
                Options = finalOptions.Select(option => new OptionDto
                {
                    Id = option.Id,
                    Correct = option.Correct,
                    Text = option.Text,
                }).ToList()
            };
        }

        // DELETE api/<QuestionController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var target = _db.Questions.Find(id);

            if (target is null)
                return NotFound();

            var optionsToRemove = _db.Options.Where(option => option.QuestionId == id);

            _db.Options.RemoveRange(optionsToRemove);
            _db.Questions.Remove(target);

            _db.SaveChanges();

            return NoContent();
        }
    }
}
