using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.Models
{
    public class Attempt
    {
        public int Id { get; set; }

        public int QuizId { get; set; }

        public string UserId { get; set; }

        public DateTime Start { get; set; }

        public DateTime Finish { get; set; }

        [ValidateNever]
        [ForeignKey(nameof(QuizId))]
        public Quiz Quiz { get; set; }

        [ValidateNever]
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
    }
}
