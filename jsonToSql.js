const fs = require('fs');
const data = JSON.parse(fs.readFileSync('wordList.json', 'utf8'));

let sql = 'INSERT INTO words (ja, en) VALUES \n';
data.forEach((item, index) => {
  sql += `('${item.ja}', '${item.en}')`;
  if (index < data.length - 1) {
    sql += ',\n';
  } else {
    sql += ';\n';
  }
});

fs.writeFileSync('insert.sql', sql);
