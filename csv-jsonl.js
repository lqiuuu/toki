import fs from 'fs/promises';
import Papa from 'papaparse';

// Define input CSV and output JSONL file paths
const inputCSV = 'en_tp.csv';
const outputJSON = 'en_tp.jsonl';

// Read the CSV file
const csvData = await fs.readFile(inputCSV, 'utf8');

// Parse the CSV data into rows
const { data: rows } = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

// Convert rows into JSONL format
const jsonData = rows.map((row) => {
  // Extract the hot take from the CSV row
  const en = `${row['english']}`
  const tokiPona = `${row['tokipona']}`;

  // Format the conversation for fine-tuning
  return JSON.stringify({
    messages: [
      {
        role: 'system',
        content: 'You are a toki pona translator.',
      },
      { role: 'user', content: 'translate this to toki pona: ' + en },
      { role: 'assistant', content: tokiPona },
    ],
  });
});

// Write the JSONL data to the output file
await fs.writeFile(outputJSON, jsonData.join('\n'), 'utf8');

// Log a message indicating the conversion is complete
console.log(`Dataset converted and saved to ${outputJSON}`);