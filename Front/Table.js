const tableData = document.getElementById("table-data");
const pageSize = 100; // количество строк, загружаемых за один раз
let currentPage = 0; // текущая страница

const columnIndexes = {
    inn: 1,
    okopf_code: 2,
    okfs_code: 3,
    oktmo_reg_code: 4,
    avg_staff_qty: 5,
    procedure_qty: 6,
    win_qty: 7,
    exclude_date: 8,
    msp_category: 9,
    usn_simlified_tax_system: 10,
    envd_imputed_tax: 11,
    amount_due: 12,
    contract_price_rub: 13,
    subcontractor_sum_percents: 14,
    execution_end_date: 15,
    e_doc_execution_count: 16
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
