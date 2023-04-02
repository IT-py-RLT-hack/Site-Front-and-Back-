const http = require('http');
const fs = require('fs');
const parse = require('csv-parse');

// Создаем HTTP-сервер
const server = http.createServer((req, res) => {
  // Загружаем файл с данными
  const filename = 'data.csv';
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Внутренняя ошибка сервера');
    } else {
      // Считываем первый столбец из .csv и выводим его на страницу
      parse(data, { columns: false }, (err, output) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Внутренняя ошибка сервера');
        } else {
          const suppliers = output.map(row => row[0]);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write('<!DOCTYPE html>');
          res.write('<html>');
          res.write('<head>');
          res.write('<meta charset="UTF-8">');
          res.write('<title>Заголовок страницы</title>');
          res.write('<link rel="stylesheet" href="style.css">');
          res.write('</head>');
          res.write('<body>');
          res.write('<header>');
          res.write('<div class="logo">');
          res.write('<a href="index.html"><img src="logo.png" alt="Логотип"></a>');
          res.write('</div>');
          res.write('<nav>');
          res.write('<ul>');
          res.write('<li><a href="#">Главная</a></li>');
          res.write('<li><a href="#">О нас</a></li>');
          res.write('<li><a href="#">Контакты</a></li>');
          res.write('</ul>');
          res.write('</nav>');
          res.write('</header>');
          res.write('<main>');
          res.write('<section>');
          res.write('<h1>Поставщики:</h1>');
          res.write('<ul>');
          suppliers.forEach(supplier => {
            res.write(`<li>${supplier}</li>`);
          });
          res.write('</ul>');
          res.write('</section>');
          res.write('</main>');
          res.write('<footer>');
          res.write('<div class="footer-content">');
          res.write('<p>Авторские права &copy; 2023</p>');
          res.write('</div>');
          res.write('</footer>');
          res.write('</body>');
          res.write('</html>');
          res.end();
        }
      });
    }
  });
});

// Запускаем сервер на порту 3000
server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
