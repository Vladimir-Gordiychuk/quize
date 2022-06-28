using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.Models
{
    public class AttemptDetail
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AttemptId { get; set; }

        [Required]
        public int OptionId { get; set; }

        [Required]
        public bool Selected { get; set; }

        [ValidateNever]
        [ForeignKey(nameof(AttemptId))]
        public Attempt Attempt { get; set; }

        [ValidateNever]
        [ForeignKey(nameof(OptionId))]
        public Option Option { get; set; }

    }
}
