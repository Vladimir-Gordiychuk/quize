using Quiz.Models;

namespace Quiz.Dtos
{

    public class QuestionDto
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public List<OptionDto> Options { get; set; }
    }
}
