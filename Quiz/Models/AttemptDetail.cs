using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.Models
{
    public class AttemptDetail
    {
        public int Id { get; set; }

        public int AttemptId { get; set; }

        public int OptionId { get; set; }

        public bool Selected { get; set; }

        [ValidateNever]
        [ForeignKey(nameof(AttemptId))]
        public Attempt Attempt { get; set; }

        [ValidateNever]
        [ForeignKey(nameof(OptionId))]
        public Option Option { get; set; }

    }
}
