using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz.Models
{
    public class Quiz
    {
        public int Id { get; set; }

        public string? AuthorId { get; set; }

        public string Title { get; set; }

        public int Hash { get; set; }

        public int TimeLimit { get; set; }

        [ValidateNever]
        [ForeignKey(nameof(AuthorId))]
        public ApplicationUser Author { get; set; }
    }
}
