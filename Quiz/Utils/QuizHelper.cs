namespace Quiz.Utils
{
    public static class QuizHelper
    {
        public static int GetQuizHash(IEnumerable<int> questionIds)
        {
            var ids = questionIds.ToList();

            // Sort ids in order to make Quiz Hash value independent
            // from the order which was used to specify question ids.
            ids.Sort();

            return Hash(ids);
        }

        static int Hash(IEnumerable<int> integers)
        {
            IEnumerator<int> intEnum = integers.GetEnumerator();

            if (intEnum.MoveNext() == false) return 0;

            int hash = 0;
            unchecked
            {
                hash = intEnum.Current.GetHashCode();
                for (; intEnum.MoveNext() == true;)
                    hash = 31 * hash + intEnum.Current.GetHashCode();
            }

            return hash;
        }
    }
}
