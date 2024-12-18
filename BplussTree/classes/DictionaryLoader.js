const fs = require('fs');

function loadDictionary(filePath, tree) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');
        
        for (const line of lines) {
            if (!line.includes(',')) continue;

            const [word, meaning] = line.split(',', 2);
            if (word && meaning) {
                tree.insert(word.trim(), meaning.trim());
            }
        }
    } catch (error) {
        console.error(`Failed to open file: ${filePath}`);
    }
}

module.exports = loadDictionary;
