// Получение ссылки на таблицу
const tableData = document.getElementById("table-data");

// Создание объекта XMLHttpRequest
const xhr = new XMLHttpRequest();

// Открытие CSV-файла
xhr.open("GET", "data.csv", true);

// Установка типа ответа на CSV-файл
xhr.overrideMimeType("text/csv");

// Обработчик успешного завершения запроса
xhr.onload = function() {
    // Разбиение CSV-файла на строки
    const lines = xhr.responseText.split("\n");

    // Заполнение таблицы данными
    for (let i = 0; i < lines.length; i++) {
        // Удаляем пробелы и переводы строк из начала и конца строки
        const line = lines[i].trim();

        // Разбиваем строку на ячейки, используя разделитель ";"
        const cells = line.split(";");

        // Пропускаем первую строку, если она содержит заголовки
        if (i === 0 && cells[0].toLowerCase() === "name") {
            continue;
        }

        const row = document.createElement("tr");
        for (let j = 0; j < cells.length; j++) {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(cells[j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tableData.appendChild(row);
    }
};

// Отправка запроса на сервер
xhr.send();


// Получение ссылки на форму
const sortForm = document.getElementById("sort-form");

// Получение ссылки на список выбора сортировки
const sortSelect = document.getElementById("sort-select");

// Добавление обработчика события на отправку формы
sortForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Отмена отправки формы

  const sortValue = sortSelect.value; // Получение значения выбранного параметра сортировки

  // Выбор функции сортировки в зависимости от выбранного параметра
  if (sortValue === "wins-asc") {
    sortAscWins();
  } else if (sortValue === "wins-desc") {
    sortDescWins();
  }
});

// Функция сортировки по возрастанию для колонки "Количество побед в тендерах"
function sortAscWins() {
  // Получение индекса колонки "Количество побед в тендерах"
  const index = 10;

  // Сортировка ячеек колонки по возрастанию
  cells[index].sort(function(a, b) {
    const aValue = parseInt(a.textContent);
    const bValue = parseInt(b.textContent);
    if (isNaN(aValue)) {
      return 1;
    } else if (isNaN(bValue)) {
      return -1;
    } else {
      return aValue - bValue;
    }
  });

  // Перестановка ячеек таблицы в соответствии с новым порядком сортировки
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const newRow = document.createElement("tr");
    for (let j = 0; j < cells.length; j++) {
      newRow.appendChild(cells[j][i].cloneNode(true));
    }
    table.appendChild(newRow);
  }
}

// Функция сортировки по убыванию для колонки "Количество побед в тендерах"
function sortDescWins() {
  // Получение индекса колонки "Количество побед в тендерах"
  const index = 10;

  // Сортировка ячеек колонки по убыванию
  cells[index].sort(function(a, b) {
    const aValue = parseInt(a.textContent);
    const bValue = parseInt(b.textContent);
    if (isNaN(aValue)) {
      return -1;
    } else if (isNaN(bValue)) {
      return 1;
    } else {
      return bValue - aValue;
    }
  });

  // Перестановка ячеек таблицы в соответствии с новым порядком сортировки
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const newRow = document.createElement("tr");
    for (let j = 0; j < cells.length; j++) {
      newRow.appendChild(cells[j][i].cloneNode(true));
    }
    table.appendChild(newRow);
  }
}
