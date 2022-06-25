using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.Models
{

    public class QuizQuestion
    {
        public int Id { get; set; }

        public int QuizId { get; set; }

        public int QuestionId { get; set; }

        [ValidateNever]
        [ForeignKey(nameof(QuizId))]
        public Quiz Quiz { get; set; }

        [ValidateNever]
        [ForeignKey(nameof(QuestionId))]
        public Question Question { get; set; }

    }
}
