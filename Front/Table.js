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
