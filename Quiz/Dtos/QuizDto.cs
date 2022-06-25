namespace Quiz.Dtos
{
    public class QuizDto
    {
        public int? Id { get; set; }

        public string Title { get; set; }

        public int Hash { get; set; }

        public int TimeLimit { get; set; }

        public List<QuestionDto> Questions { get; set; }
    }
}
