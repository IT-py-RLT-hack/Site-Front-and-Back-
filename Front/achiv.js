let achievementsData; // определяем переменную в глобальном контексте

// Загружаем данные из CSV файла
Papa.parse("achievements.csv", {
  download: true,
  header: true,
  complete: function (results) {
    achievementsData = results.data; // Сохраняем данные в переменную "achievementsData"

    // Получаем элементы формы и списка ачивок
    const innInput = document.getElementById("inn-input");
    const achivementsList = document.getElementById("achivements-list");
    const searchButton = document.getElementById("search-button");

    // Обработчик события клика на кнопке "Поиск"
    searchButton.addEventListener("click", function() {
      const input = innInput.value; // Получаем значение ИНН из элемента input

      if (!achievementsData) {
        alert("Данные не загружены. Попробуйте позже.");
        return;
      }

      // Поиск компании с заданным ИНН и ее ачивок
      const company = achievementsData.find((company) => company.inn === input);

      // Обработка результатов поиска и вывод списка ачивок
      achivementsList.innerHTML = ""; // очистка списка перед каждым поиском

      if (!company) {
        achivementsList.innerHTML = "<li>Компания не найдена</li>";
      } else {
        const achievements = Object.keys(company).filter((key) => company[key] === "1");
        if (achievements.length === 0) {
          achivementsList.innerHTML = "<li>У компании нет ачивок</li>";
        } else {
          const achievementsRow = document.createElement("div");
          achievementsRow.classList.add("achievements-row");
          achievements.forEach((achievement) => {
            const span = document.createElement("span");
            span.classList.add("achievement");
            const img = document.createElement("img");
            img.src = `${achievement}.png`;
            img.alt = achievement;
            img.style.width = "50px";
            img.style.height = "50px";
            span.appendChild(img);
            achievementsRow.appendChild(span);
          });
          achivementsList.appendChild(achievementsRow);
        }

      }
    });
  },
});
