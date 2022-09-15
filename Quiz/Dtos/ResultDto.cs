namespace Quiz.Dtos
{
    public class ResultDto
    {
        /// <summary>
        /// Result Id is the same as Attempt Id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Quiz Title.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Attempt status.
        /// See <see cref="Models.AttemptStatus"/> for more details.
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// Total question count.
        /// </summary>
        public int TotalQuestions { get; set; }

        /// <summary>
        /// Number of correct answers given.
        /// </summary>
        public int CorrectAnswers { get; set; }
    }
}
