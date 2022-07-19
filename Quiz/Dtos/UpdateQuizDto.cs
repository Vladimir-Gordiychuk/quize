using System.ComponentModel.DataAnnotations;

namespace Quiz.Dtos
{
    public class UpdateQuizDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        [Range(10, 3600)]
        public int TimeLimit { get; set; }

        [Required]
        public List<int> QuestionIds { get; set; }
    }
}
