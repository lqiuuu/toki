// import * as fs from "fs";
import express from "express";
// import path from "path";
import {isAllowed, simplifier} from "./node-simplify.js";
import bodyparser from "body-parser";

const app = express();
const PORT = 3200;

// const globalUserInput = "this is the default";

app.use(express.static('public'));
app.use(bodyparser);


app.get('/api/results', (req, res) => {
    // const simplified = simplifier(globalUserInput);
    res.send(simplified);
});

app.post('/submit', (req, res) => {
    globalUserInput = req.body; // Access the input value
    // const poem = simplifier(userInput);
    console.log(`Received input: ${userInput}`);
    // console.log(poem);
    res.send(`You entered: ${userInput}`);
});


// const sentence = "The horizon blushed with the colors of twilight, as if the heavens were painting their farewell to the day in hues of gold and lavender."
// const sentence = userInput;
// console.log("original: " + sentence);
const simplified = simplifier(sentence);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});