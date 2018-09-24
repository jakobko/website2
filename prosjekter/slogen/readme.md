# Slogen
- The slogan generator for startups.


Slogen takes a word and returns a sentence built up from that word. It gets an image to add some flavour to the text.


## Slogan sentence
The sentence is built up the following way:

`A + B + C + ", "+ D + E + F + "!"`

where

```
A = adjective to C
B = adjective to C
C = input word
D = antonym of A
E = adjective to F
F = rhymes and has similar meaning to C
```

Slogen uses the [Datamuse API](https://www.datamuse.com/api/) to get the different words.

## Image
The image is found by using API calls to Google's Custom Search API. It returns the first image result from a search query composed off `A + " " + C`.
