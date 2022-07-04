namespace Quiz.Dtos
{
    public class NewQuizDto
    {
        public string Title { get; set; }

        public int TimeLimit { get; set; }

        public List<int> QuestionIds { get; set; }
    }
}
