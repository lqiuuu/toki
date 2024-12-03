// const express = require('express');
import express from 'express';
// const app = express();
// const port = 3000;

import bodyParser from 'body-parser';

import { pipeline } from '@xenova/transformers';

const app = express();
app.use(bodyParser.json());

let summarizer, translator;

// Load models on startup
(async () => {
    console.log('Loading models...');
    summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-12-3');
    translator = await pipeline('translation', 'Xenova/t5-small'); // Adjust to your target language pair
    console.log('Models loaded!');
})();


// const essence = await summarizer('Explain the importance of language evolution.');
// const translation = await translator(`Translate to Toki Pona: ${essence[0].summary_text}`);
// console.log(translation[0].translation_text);

app.post('/summarize', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required for summarization' });
    }

    try {
        const summary = await summarizer(text, { max_length: 50, min_length: 20 });
        res.json({ original: text, summary: summary[0].summary_text });
    } catch (error) {
        console.error('Error during summarization:', error);
        res.status(500).json({ error: 'Summarization failed', details: error.message });
    }
});

app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required for translation' });
    }

    try {
        const translation = await translator(`Translate to ${targetLanguage}: ${text}`);
        console.log(translation);
        res.json({ original: text, translation: translation[0].translation_text });
    } catch (error) {
        console.error('Error during translation:', error);
        res.status(500).json({ error: 'Translation failed', details: error.message });
    }
});


app.listen(3000, () => console.log('API running on http://localhost:3000'));
