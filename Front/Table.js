const tableData = document.getElementById("table-data");
const pageSize = 100; // количество строк, загружаемых за один раз
let currentPage = 0; // текущая страница

const columnIndexes = {
    inn: 1,
    okopf_code: 2,
    okfs_code: 3,
    oktmo_reg_code: 4,
    okved_basic_code: 5,
    registration_date: 6,
    capital_size: 7,
    avg_staff_qty: 8,
    procedure_qty: 9,
    win_qty: 10,
    exclude_date: 11,
    msp_category: 12,
    usn_simlified_tax_system: 13,
    envd_imputed_tax: 14,
    amount_due: 15,
    contract_price_rub: 16,
    subcontractor_sum_percents: 17,
    execution_end_date: 18,
    e_doc_execution_count: 19
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

  // Добавление обработчиков кликов на заголовки столбцов таблицы
  const tableHeaders = document.querySelectorAll('#table th');
  for (let i = 0; i < tableHeaders.length; i++) {
    tableHeaders[i].addEventListener('click', (event) => {
      const columnIndex = Object.values(columnIndexes).indexOf(i + 1);
      const isAscendingOrder = event.currentTarget.classList.contains('asc');

      // Определение порядка сортировки
      let order;
      if (isAscendingOrder) {
        event.currentTarget.classList.remove('asc');
        event.currentTarget.classList.add('desc');
        order = 'desc';
      } else {
        event.currentTarget.classList.remove('desc');
        event.currentTarget.classList.add('asc');
        order = 'asc';
      }

      // Сортировка таблицы по столбцу
      sortTable(columnIndex, order);
    });
  }
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', handleSearch);

    function handleSearch(event) {
      const searchQuery = event.target.value.trim().toLowerCase();

      // Получаем все строки таблицы
      const table = document.querySelector('#table');
      const tbody = table.querySelector('tbody');
      const rows = tbody.querySelectorAll('tr');

      // Проходим по каждой строке таблицы и проверяем, содержит ли она искомый ИНН
      for (const row of rows) {
        const innCell = row.querySelector('[data-column="inn"]');
        if (innCell) {
          const innValue = innCell.innerText.trim().toLowerCase();
          if (innValue.includes(searchQuery)) {
            row.classList.remove('hidden');
          } else {
            row.classList.add('hidden');
          }
        }
      }
    }

    const clearButton = document.getElementById('search-clear');
    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      handleSearch({ target: searchInput });
    });

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

  // Функция для получения данных ячейки таблицы
  function getCellValue(row, index) {
    return row.cells[index].innerText.trim();
  }

  // Функция для сортировки таблицы по столбцу
  function sortTable(columnIndex, order = 'asc') {
    const table = document.querySelector('#table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Сортировка строк таблицы
    const sortedRows = rows.sort((a, b) => {
      const aCellValue = getCellValue(a, columnIndex);
      const bCellValue = getCellValue(b, columnIndex);

      if (order === 'asc') {
        return aCellValue.localeCompare(bCellValue, undefined, { numeric: true });
      } else {
        return bCellValue.localeCompare(aCellValue, undefined, { numeric: true });
      }
    });

    // Удаление всех строк из таблицы
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    // Добавление отсортированных строк в таблицу
    for (const row of sortedRows) {
      tbody.appendChild(row);
    }
  }
};

// Отправка запроса на сервер
xhr.send();

