namespace Quiz.Models
{
    public enum AttemptStatus : int
    {
        /// <summary>
        /// Reserved.
        /// </summary>
        Undefined = 0,

        /// <summary>
        /// This is the default state for all
        /// new attempts.
        /// </summary>
        Started = 1,

        /// <summary>
        /// Submited.
        /// </summary>
        Submitted = 2,

        /// <summary>
        /// Never submited in time.
        /// </summary>
        Expired = 4
    };
}
