import nlp from "compromise";
import * as fs from 'fs';

//simplifier lexicon
// const allowedWords = [
//     "I", "you", "we", "it", "good", "bad", "happy", "sad", "eat", "drink", 
//     "walk", "run", "love", "animal", "plant", "sky", "water", "food"
//   ];
const allowedWords = fs.readFileSync('lexicon/words.txt').toString().split('\n')

//filter
const stopWords = ["the", "and", "of", "is", "are", "in", "on", "under", "for", "with", "a", "an", "over"];

  
  // check if word is in lexicon
  function isAllowed(word) {
    return allowedWords.includes(word.toLowerCase());
  }

//   function isAllowedTense(word){
//     return allowedWords.includes(word.verbs().toPresentTense());
//   }

// define word mapping
// const wordToPhrase = {
//     "bird": "sky animal",
//     "ocean": "big water",
//     "beautiful": "good",
//     "vast": "big",
//     "fly": "motion high"
//   };

const wordToPhrase = JSON.parse(fs.readFileSync('lexicon/essence.json'));

// import wordToPhrase from './essence.json' with { type: 'json' };

// const essence = await fetch("essence.json");
// const wordToPhrase = await essence.json();
  

  // replace complex word with simple vocab
  function simplifyWithDescriptions(sentence) {
    let doc = nlp(sentence).sentences().toInfinitive();
    console.log("original: " + doc.text());
  
    // check word by word
    doc.terms().forEach(term => {
      const word = term.text();
      if (!stopWords.includes(word.toLowerCase())){
      if (wordToPhrase[word.toLowerCase()]) {
        // use word mapping to replace
        term.replaceWith(wordToPhrase[word.toLowerCase()]);
      } 
        // else if (wordToPhrase[word.toPresentTense()]){
        // term.replaceWith(wordToPhrase[word.verbs().toPresentTense()]);
        // console.log(word);}

        else if (!isAllowed(word)) {
        // if not in lexicon(tense sensitive), not filtered and not in mapping
        term.replaceWith("[unknown]");
      }
    }
    });
  
    // sentence after replacing
    return doc.text();
  }
  
  // use
  const sentence = "The beautiful bird flew over the vast ocean.";
  const simplified = simplifyWithDescriptions(sentence);
  console.log(simplified); // export: "The good sky animal flew over the big water."
//   console.log(verbs().toPresentTense)