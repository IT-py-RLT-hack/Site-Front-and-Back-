const tableData = document.getElementById("table-data");
const pageSize = 100; // количество строк, загружаемых за один раз
let currentPage = 0; // текущая страница

const columnIndexes = {
  avg_staff_qty: 1,
  procedure_qty: 2,
  win_qty: 3,
  exclude_date: 4,
  msp_type: 5,
  msp_category: 6,
  usn_simlified_tax_system: 7,
  envd_imputed_tax: 8,
  amount_due: 9,
  okopf_code: 10,
  okfs_code: 11,
  oktmo_reg_code: 12,
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

  // Отображение первой страницы таблицы
  renderTable(lines.slice(1, pageSize + 1));

  // Добавление обработчика прокрутки страницы
  window.addEventListener("scroll", handleScroll);
  
  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // Проверка, достигли ли мы конца страницы
    if (scrollTop + clientHeight >= scrollHeight) {
      // Загрузка следующей страницы таблицы
      currentPage++;
      const startIndex = currentPage * pageSize + 1;
      const endIndex = startIndex + pageSize;
      const rows = lines.slice(startIndex, endIndex);
      renderTable(rows);
    }
  }
  
  function renderTable(rows) {
    // Заполнение таблицы данными
    for (let i = 0; i < rows.length; i++) {
      // Удаляем пробелы и переводы строк из начала и конца строки
      const line = rows[i].trim();

      // Разбиваем строку на ячейки, используя разделитель ","
      const cells = line.split(",");

      const row = document.createElement("tr");
      for (let j = 1; j < cells.length; j++) {
        const cell = document.createElement("td");
        cell.dataset.column = Object.keys(columnIndexes)[j - 1];
        const cellText = document.createTextNode(cells[j]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      tableData.appendChild(row);
    }
  }
};

// Отправка запроса на сервер
xhr.send();
