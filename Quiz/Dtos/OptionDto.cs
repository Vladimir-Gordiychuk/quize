using Quiz.Models;

namespace Quiz.Dtos
{
    public class OptionDto
    {
        public OptionDto()
        {
            Text = String.Empty;
        }

        public OptionDto(Option option)
        {
            Id = option.Id;
            Text = option.Text;
            Correct = option.Correct;
        }

        public int? Id { get; set; }

        public string Text { get; set; }

        public bool Correct { get; set; }
    }
}
