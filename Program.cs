using System;

namespace algorithms
{
    class Program
    {
        static void Main(string[] args)
        {
            //find words that exist in a given phone number
            new Phone().Solve("3662277", "foo", "bar", "baz", "foobar", "emo", "cap", "car", "cat", "mac", "cpr");
        }
    }
}
