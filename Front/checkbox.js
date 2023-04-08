// Добавление обработчиков изменения состояния чекбоксов
const columnToggle = document.getElementById('column-toggle');
const checkboxes = columnToggle.querySelectorAll('input[type="checkbox"]');
for (const checkbox of checkboxes) {
  checkbox.addEventListener('change', handleColumnToggle);
}

function handleColumnToggle() {
  // Получаем выбранные чекбоксы
  const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

  // Скрываем или показываем столбцы таблицы в зависимости от выбранных чекбоксов
  const tableHeaders = document.querySelectorAll('#table th');
  for (let i = 0; i < tableHeaders.length; i++) {
    const columnIndex = Object.values(columnIndexes).indexOf(i + 1);
    const isColumnChecked = checkedCheckboxes.some(checkbox => checkbox.name === Object.keys(columnIndexes)[columnIndex]);
    tableHeaders[i].style.display = isColumnChecked ? '' : 'none';

    // Показываем или скрываем ячейки в столбце таблицы
    const cells = document.querySelectorAll(`[data-column="${Object.keys(columnIndexes)[columnIndex]}"]`);
    for (const cell of cells) {
      cell.style.display = isColumnChecked ? '' : 'none';
    }
  }
}
