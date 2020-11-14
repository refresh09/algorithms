using System;
using System.Collections.Generic;

/*
    /  1  /  2  /  3  /
            abc   def 
    /  4  /  5  /  6  /
      ghi   jkl   mno
    /  7  /  8  /  9  /
     pqrs   tuv  wxyz 
*/
public class Phone {
    //map letter to phone number, index = alphabet sequence
    int[] map = { 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9 };

    //main entry
    public void Solve(string phoneNumber, params string[] words) {
        Console.WriteLine("phone number: " + phoneNumber);
        Node trie = new Node();     
        
        //add phone number to trie
        var phoneNumberInts = new int[phoneNumber.Length];
        for (var i=0; i< phoneNumber.Length; ++i) 
            phoneNumberInts[i] = int.Parse(phoneNumber[i].ToString());
        trie.AddNumber(phoneNumberInts, 0);

        //enumerate words
        for (int i=0; i<words.Length; ++i) {
            var word = words[i];

            //translate to number form
            var wordNumbers = this.ToNumbers(word);

            //search for number in trie
            var found = this.Search(trie, wordNumbers, 0);
            Console.WriteLine(found);
        }

        //add all words to trie
        /*
        for (int i=0; i<words.Length; ++i) {
            var word = words[i];
            trie.AddNumber(this.ToNumbers(word), 0);
        }
        Console.WriteLine(trie);
        */
    }

    public int[] ToNumbers(string word) {
        Console.WriteLine(word);

        var numbers = new int[word.Length];
        for (int j=0; j<word.Length; ++j)
            numbers[j] += map[word[j] - 'a'];
        
        Console.WriteLine(string.Join(string.Empty, numbers));
        return numbers;
    }

    public bool Search(Node root, int[] word, int charIndex) {
        Queue<Node> queue = new Queue<Node>();

        for (var i=0; i<root.Children.Length; ++i) {
            if (root.Children[i] != null)
                queue.Enqueue(root.Children[i]);
        }

        var found = false;
        var number = word[charIndex];
        while (queue.Count > 0) {
            var node = queue.Dequeue();

            //if number matched, try to find next number - else continue trying to find current number
            var currentFound = node.Value == number;
            var nextIndex = currentFound ? charIndex + 1 : charIndex;
            if (nextIndex < word.Length)
                found = this.Search(node, word, nextIndex);
            else
                found = currentFound;
        }
        return found;
    }
}

//Trie
public class Node {
    public Node[] Children {get;private set;} = new Node[10];
    public int Value {get; set;}

    public Node() {}
    public Node(int val) {
        this.Value = val;
    }

    public void AddNumber(int[] word, int charIndex) {
        //base case - all letters added
        if (charIndex == word.Length)
            return;

        var charr = word[charIndex];
        if (this.Children[charr] == null) 
            this.Children[charr] = new Node(charr);

        this.Children[charr].AddNumber(word, ++charIndex);
    }    
}
