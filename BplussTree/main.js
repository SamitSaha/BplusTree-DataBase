// const fs = require('fs');
// const path = require('path');
// const csv = require('csv-parser');
// const readline = require('readline');

// // Path to the CSV file
// const filePath = path.join(__dirname, 'dictionary.csv');

// let rows = [];

// // Function to find a word in the CSV file
// function findWordInCSV(word) {
//   let found = false;

//   rows.forEach((row, index) => {
//     const keys = Object.keys(row); // Get all column names dynamically
//     const englishWord = row[keys[0]]?.trim(); // Assume first column is English word
//     const bengaliMeaning = row[keys[1]]?.trim(); // Assume second column is Bengali meaning

//     if (englishWord && englishWord.toLowerCase() === word.toLowerCase()) {
//       console.log(`\nWord Found: "${englishWord}"`);
//       console.log(`Bengali Meaning: "${bengaliMeaning}"`);
//       console.log(`Row Number: ${index+2}`);
//       found = true;
//     }
//   });

//   if (!found) {
//     console.log(`\nWord "${word}" not found in the dictionary.`);
//   }
// }

// // User input setup
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // Read CSV File
// fs.createReadStream(filePath)
//   .pipe(csv())
//   .on('data', (row) => {
//     rows.push(row); // Push each row as an object
//   })
//   .on('end', () => {
//     console.log(`CSV file loaded. Total Rows: ${rows.length}`);
//     console.log(`Total Columns: ${Object.keys(rows[0]).length}`);
//     /*
//     // Print 5 random rows
//     console.log('\nRandom Rows:');
//     for (let i = 0; i < 5; i++) {
//       const randomRow = rows[Math.floor(Math.random() * rows.length)];
//       console.log(randomRow);
//     }
//     */

//     // Search random word from the csv file. 
//     rl.question('Enter an English word to search: ', (word) => {
//       findWordInCSV(word);
//       rl.close();
//     });
//   });

// const fs = require('fs');
// const path = require('path');
// const csv = require('csv-parser');
// const readline = require('readline');

// // Path to the CSV file
// const filePath = path.join(__dirname, 'dictionary.csv');

// let rows = [];

// // Function to find a word in the CSV file
// function findWordInCSV(word) {
//   let found = false;

//   rows.forEach((row, index) => {
//     const keys = Object.keys(row); // Get all column names dynamically
//     const englishWord = row[keys[0]]?.trim(); // Assume first column is English word
//     const bengaliMeaning = row[keys[1]]?.trim(); // Assume second column is Bengali meaning

//     if (englishWord && englishWord.toLowerCase() === word.toLowerCase()) {
//       console.log(`\nWord Found: "${englishWord}"`);
//       console.log(`Bengali Meaning: "${bengaliMeaning}"`);
//       console.log(`Row Number: ${index + 1}`);
//       found = true;
//     }
//   });

//   if (!found) {
//     console.log(`\nWord "${word}" not found in the dictionary.`);
//   }
// }

// // Function to insert a new word alphabetically
// function insertWordAlphabetically(newWord, newMeaning) {
//   const keys = Object.keys(rows[0]); // Dynamically find column names
//   const newEntry = {
//     [keys[0]]: newWord.trim(),
//     [keys[1]]: newMeaning.trim(),
//   };

//   // Insert and sort
//   rows.push(newEntry);
//   rows.sort((a, b) => a[keys[0]].localeCompare(b[keys[0]]));

//   // Find the row number
//   const rowIndex = rows.findIndex((row) => row[keys[0]] === newWord.trim());

//   console.log(`\nNew Word Inserted: "${newWord}"`);
//   console.log(`Bengali Meaning: "${newMeaning}"`);
//   console.log(`Row Number: ${rowIndex + 1}`);

//   // Write back to the file
//   const updatedData = [keys.join(',')]; // Start with headers
//   rows.forEach((row) => {
//     updatedData.push(`${row[keys[0]]},${row[keys[1]]}`);
//   });

//   fs.writeFileSync(filePath, updatedData.join('\n'), 'utf8');
//   console.log('\nCSV file updated successfully.');
// }

// // User input setup
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // Read CSV File
// fs.createReadStream(filePath)
//   .pipe(csv())
//   .on('data', (row) => {
//     rows.push(row); // Push each row as an object
//   })
//   .on('end', () => {
//     console.log(`CSV file loaded. Total Rows: ${rows.length}`);
//     rl.question(
//       'Do you want to search for a word (S) or insert a new word (I)? [S/I]: ',
//       (choice) => {
//         if (choice.toLowerCase() === 's') {
//           rl.question('Enter an English word to search: ', (word) => {
//             findWordInCSV(word);
//             rl.close();
//           });
//         } else if (choice.toLowerCase() === 'i') {
//           rl.question('Enter the English word to insert: ', (newWord) => {
//             rl.question('Enter the Bengali meaning: ', (newMeaning) => {
//               insertWordAlphabetically(newWord, newMeaning);
//               rl.close();
//             });
//           });
//         } else {
//           console.log('Invalid choice. Please enter S or I.');
//           rl.close();
//         }
//       }
//     );
//   });

// B+ Tree Node Class

/*const BPlusTree = require('./classes/BPlusTree');
const loadDictionary = require('./classes/DictionaryLoader');
const readline = require('readline');

const tree = new BPlusTree(4);  // B+ Tree with order 4

// Replace this path with the path to your file
const filePath = './Dictionary.csv';

loadDictionary(filePath, tree);
console.log("Dictionary loaded. Testing search:");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    rl.question('Enter a word to search (or type "exit" to quit): ', (word) => {

        // Check if the user wants to exit
        if (word.toLowerCase() === 'exit' || word.toLowerCase() === 'quit') {
            console.log("Exiting the program...");
            rl.close(); // Close the readline interface
            process.exit(0); // Exit the Node.js process
        }
        
        const meaning = tree.search(word);
        console.log(`Meaning: ${meaning}`);
        promptUser();
    });
}

promptUser();*/
