// Загружаем данные из файла data.csv
fetch('data.csv')
  .then(response => response.text())
  .then(data => {
    // Считываем первый столбец из .csv
    const rows = data.split('\n');
    const suppliers = rows.map(row => row.split(',')[0]);

    // Добавляем названия поставщиков в список на странице
    const list = document.querySelector('#suppliers-list');
    suppliers.forEach(supplier => {
      const item = document.createElement('li');
      item.textContent = supplier;
      list.appendChild(item);
    });
  })
  .catch(error => {
    console.error('Ошибка загрузки данных:', error);
  });

