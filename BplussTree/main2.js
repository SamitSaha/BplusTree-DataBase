const BPlusTree = require('./classes/BPlusTree');
const loadDictionary = require('./classes/DictionaryLoader');
const fs = require('fs');
const readline = require('readline');
const tree = new BPlusTree(400);

// // INSERT
// tree.insert('apple', 'A fruit that is red, green, or yellow');
// tree.insert('banana', 'A long yellow fruit');
// tree.insert('cherry', 'A small red fruit');
// console.log('Initial Tree:');
// tree.display();

// // SEARCH
// const meaning = tree.search('apple');
// console.log('\nMeaning of apple:', meaning);

// // UPDATE
// tree.update('apple', 'A delicious fruit that comes in red, green, and yellow');
// console.log('\nAfter update:');
// tree.display();

// // DELETE
// tree.delete('banana');
// console.log('\nAfter delete:');
// tree.display();

// Load CSV file into the B+ Tree

// function loadDictionary(filePath, tree) {
//     const data = fs.readFileSync(filePath, 'utf8');
//     const lines = data.split('\n');
//     lines.forEach(line => {
//         const [word, meaning] = line.split(',');
//         if (word && meaning) {
//             tree.insertInternal(word, meaning);
//         }
//     });
//     console.log('Dictionary loaded.');
// }

const filePath = './Dictionary.csv';
loadDictionary(filePath, tree);
console.log("Dictionary loaded. Start Testing");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    rl.question('Enter a command (insert, update, delete, search, display exit): ', (command) => {
        if (command === 'exit') {
            console.log('Exiting the program...');
            rl.close();
            process.exit(0);
        }

        rl.question('Enter the word: ', (word) => {
            if (command === 'search') {
                const result = tree.search(word);
                console.log('Meaning:', result);
                promptUser();
            } else if (command === 'delete') {
                tree.delete(word);
                promptUser();
            } else if (command === 'update') {
                rl.question('Enter the new meaning: ', (newValue) => {
                    tree.update(word, newValue);
                    promptUser();
                });
            } else if (command === 'insert') {
                rl.question('Enter the meaning: ', (meaning) => {
                    tree.insert(word, meaning);
                    promptUser();
                });
            } else if(command === 'display'){
                tree.display();
                promptUser();
            }else {
                console.log('Invalid command.');
                promptUser();
            }
        });
    });
}

promptUser();