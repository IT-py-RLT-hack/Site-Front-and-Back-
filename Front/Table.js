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
      cell.dataset.column = Object.keys(columnIndexes)[j];
      const cellText = document.createTextNode(cells[j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tableData.appendChild(row);
  }

  // Получение всех строк таблицы
  const rows = Array.from(tableData.getElementsByTagName("tr"));

  // Получение всех заголовков столбцов таблицы
  const headers = Array.from(document.querySelectorAll("th"));

  // Получение заголовка столбца ИНН
  const innHeader = headers.find(header => header.dataset.column === 'inn');

  if (innHeader) {
    // Добавление обработчика события клика на заголовок столбца ИНН
    innHeader.addEventListener("click", function() {
      // Сортировка строк таблицы по значению в ячейке столбца ИНН
      rows.sort((a, b) => {
        const aValue = a.cells[columnIndexes.inn].innerText;
        const bValue = b.cells[columnIndexes.inn].innerText;
        return aValue.localeCompare(bValue);
      });

      // Удаление всех строк из таблицы
      tableData.innerHTML = "";

      // Добавление отсортированных строк в таблицу
      rows.forEach(row => {
        tableData.appendChild(row);
      });
    });
  } else {
    console.error('Заголовок столбца ИНН не найден');
  }

    // Получение заголовка столбца Количество сотрудников
  const staffHeader = headers.find(header => header.dataset.column === 'staff');

  if (staffHeader) {
    // Получение всех ячеек столбца Количество сотрудников
    const staffCells = Array.from(tableData.querySelectorAll(`[data-column="${staffHeader.dataset.column}"]`));

    // Добавление переключателя на страницу
    const toggleStaff = document.createElement("input");
    toggleStaff.type = "checkbox";
    toggleStaff.checked = true;
    toggleStaff.addEventListener("change", function() {
      // Изменение отображения ячеек столбца Количество сотрудников
      const display = this.checked ? "" : "none";
      staffCells.forEach(cell => {
        cell.style.display = display;
      });
    });

    // Добавление переключателя в заголовок столбца Количество сотрудников
    staffHeader.appendChild(toggleStaff);
  } else {
    console.error('Заголовок столбца Количество сотрудников не найден');
  }
};

// Отправка запроса на сервер
xhr.send();

