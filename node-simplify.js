import nlp from "compromise";
import * as fs from 'fs';


//filter
const stopWords = ["the", "and", "of", "is", "are", "in", "on", "under", "for", "with", "a", "an", "over", "as", "if"];

//words that able to use
const allowedWords = fs.readFileSync('lexicon/words.txt').toString().split('\n');
//check if able
export function isAllowed(word) {
    return allowedWords.includes(word.toLowerCase());
}

//essence, rephrase
const wordToPhrase = JSON.parse(fs.readFileSync('lexicon/essence.json'));

export function simplifier(sentence) {

    let doc = nlp(sentence);

    doc.nouns().toSingular();
    doc.verbs().toInfinitive();

    console.log("plain: " + doc.text());

    // check word by word
    doc.terms().forEach(term => {
      const word = term.text();
      if (!stopWords.includes(word.toLowerCase())){
      if (wordToPhrase[word.toLowerCase()]) {
        // use word mapping to replace
        term.replaceWith(wordToPhrase[word.toLowerCase()]);
      } else if (!isAllowed(word)) {
        // if not in lexicon(tense sensitive), not filtered and not in mapping
        fs.writeFileSync('lexicon/unknown.txt', word, 'utf8');
        term.replaceWith("[unknown]");
      }
    }
    });
  
    // sentence after replacing
    return doc.text();
  }