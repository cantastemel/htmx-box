const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/todos', (req, res) => {
  async function getTodosJSON() {
    const result = await fetch('https://jsonplaceholder.typicode.com/todos/');
    return await result.json();
  }

  getTodosJSON().then((todos) => {
    let output = '';

    todos.map((item) => {
      output += `<li>${item.title}</li>`;
    });

    res.send(output);
  });
});

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
