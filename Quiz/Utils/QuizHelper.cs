namespace Quiz.Utils
{
    public static class QuizHelper
    {

        public static int Hash(IEnumerable<int> integers)
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
