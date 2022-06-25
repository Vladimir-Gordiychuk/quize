using Quiz.Models;

namespace Quiz.Dtos
{
    public class AttemptDto
    {

        public int Id { get; set; }

        public QuizDto Quiz { get; set; }

        public DateTime Start { get; set; }

        public DateTime? Finish { get; set; }
    }
}
