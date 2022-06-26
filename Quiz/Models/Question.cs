using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Quiz.Models
{
    public class Question
    {
        public int Id { get; set; }

        public string Text { get; set; }

        [ValidateNever]
        public ICollection<Quiz> Quizzes { get; set; }

        [ValidateNever]
        public List<QuizQuestion> QuizQuestions { get; set; }

    };
}
