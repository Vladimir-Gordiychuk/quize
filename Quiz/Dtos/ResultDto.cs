namespace Quiz.Dtos
{
    public class ResultDto
    {
        public int Id { get; set; }

        public string Status { get; set; }

        public int TotalQuestions { get; set; }

        public int CorrectAnswers { get; set; }
    }
}
