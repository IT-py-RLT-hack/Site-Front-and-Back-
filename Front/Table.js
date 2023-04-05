// Получение ссылки на таблицу
const tableData = document.getElementById("table-data");

const columnIndexes = {
  inn: 0,
  name: 1,
  activity: 2,
  city: 3,
  create_date: 4,
  reg_date: 5,
  last_tender_date: 6,
  contract_value: 7,
  staff: 8,
  ban: 9,
  bidding_num: 10,
  wins_num: 11,
  not_executed_contracts: 12,
  terminated_contracts: 13,
  likelihood_of_problems: 14,
  geo_lat: 15,
  geo_lon: 16,
};


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

        // Разбиваем строку на ячейки, используя разделитель ","
        const cells = line.split(",");

        // Пропускаем первую строку, если она содержит заголовки
        if (i === 0 && cells[0].toLowerCase() === "inn") {
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

// Получение всех строк таблицы
const rows = Array.from(tableData.getElementsByTagName("tr"));

// Функция сортировки по возрастанию для колонки "Количество побед в тендерах"
function sortAscWins() {
  const sortValue = sortSelect.value;
  const index = columnIndexes[sortValue.split('-')[0]];
  const rows = Array.from(tableData.getElementsByTagName("tr")); // перемещаем сюда

  rows.sort(function(a, b) {
    const aValue = a.cells[index].textContent;
    const bValue = b.cells[index].textContent;

    if (aValue < bValue) {
      return -1;
    }
    if (aValue > bValue) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < rows.length; i++) {
    tableData.appendChild(rows[i]);
  }
}

function sortDescWins() {
  const sortValue = sortSelect.value;
  const index = columnIndexes[sortValue.split('-')[0]];
  const rows = Array.from(tableData.getElementsByTagName("tr")); // перемещаем сюда

  rows.sort(function(a, b) {
    const aValue = a.cells[index].textContent;
    const bValue = b.cells[index].textContent;

    if (aValue < bValue) {
      return 1;
    }
    if (aValue > bValue) {
      return -1;
    }
    return 0;
  });

  for (let i = 0; i < rows.length; i++) {
    tableData.appendChild(rows[i]);
  }
}



