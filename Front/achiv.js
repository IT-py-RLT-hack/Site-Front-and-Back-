let data; // определяем переменную в глобальном контексте

// Загружаем данные из CSV файла
Papa.parse("achievements.csv", {
  download: true,
  header: true,
  complete: function (results) {
    data = results.data; // Сохраняем данные в переменную "data"

    // Получаем элементы формы и списка ачивок
    const innInput = document.getElementById("inn-input");
    const achivementsList = document.getElementById("achivements-list");
    const searchButton = document.getElementById("search-button");

    // Обработчик события клика на кнопке "Поиск"
    searchButton.addEventListener("click", function() {
      const inn = innInput.value; // Получаем значение ИНН из элемента input

      // Ищем компанию с заданным ИНН в таблице
      const company = data.find((row) => row.inn === inn);

      // Если компания найдена, выводим ее ачивки в списке на странице
      if (company) {
        // Очищаем список ачивок
        achivementsList.innerHTML = "";

        // Получаем список ачивок компании
        const achivements = Object.keys(company).filter((key) => company[key] === "1");

        // Выводим ачивки в список на странице
        achivements.forEach((achivement) => {
          const img = document.createElement("img"); // создаем элемент img
          img.src = `${achivement}.png`; // устанавливаем атрибут src для картинки
          img.alt = achivement; // устанавливаем атрибут alt для картинки
          img.style.width = "50px"; // устанавливаем ширину картинки в 50 пикселей
          img.style.height = "50px"; // устанавливаем высоту картинки в 50 пикселей
          img.title = achivement; // устанавливаем описание ачивки при наведении на нее курсора
          const div = document.createElement("div"); // создаем элемент div
          div.appendChild(img); // добавляем картинку в элемент div
          achivementsList.appendChild(div); // добавляем элемент div в список ачивок
        });
        achivementsList.style.listStyleType = "none"; // устанавливаем стиль для элементов списка
      } else {
        // Если компания не найдена, выводим сообщение об ошибке
        achivementsList.innerHTML = "<li>Компания не найдена</li>";
      }
    });
  },
});
