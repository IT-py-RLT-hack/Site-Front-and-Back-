Papa.parse("data.csv", {
  download: true,
  header: true,
  delimiter: ",",
  dynamicTyping: true,
  complete: function(results) {
    const allCompanies = results.data;
    let visibleCompanies = allCompanies.slice(0, 70); // первые 100 компаний
    let nextIndex = 70; // индекс следующей компании, которая должна быть загружена

    const companyList = document.getElementById("company-list");
    const inputList = document.createElement("div");
    companyList.appendChild(inputList);



        visibleCompanies.forEach(company => {
        const inn = company.inn;
        const yPred = company.y_pred;
        const li = document.createElement("li");

        const innText = document.createElement("p");
        innText.innerText = `ИНН: ${inn}`;
        innText.style.fontFamily = "Arial, sans-serif";
        innText.style.fontSize = "16px";
        innText.style.color = "#333";
        li.appendChild(innText);

        const yPredText = document.createElement("p"); // Добавляем значение y_pred для каждой компании
        yPredText.innerText = `y_pred: ${yPred}`;
        yPredText.style.fontFamily = "Arial, sans-serif";
        yPredText.style.fontSize = "14px";
        yPredText.style.color = "#777";
        li.appendChild(yPredText); // Добавляем значение в список

        const detailsButton = document.createElement("button"); // Создаем кнопку "Подробнее"
        detailsButton.innerText = "Подробнее"; // Устанавливаем текст кнопки
        detailsButton.style.marginLeft = "auto"; // Добавляем отступ слева для кнопки
        detailsButton.addEventListener("click", () => { // Добавляем обработчик нажатия на кнопку
            window.location.href = `company.html?inn=${inn}`; // Переходим на страницу компании с номером ИНН
        });
        li.appendChild(detailsButton); // Добавляем кнопку в список

        inputList.appendChild(li);
    });

    window.addEventListener("scroll", handleScroll);

    function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        // Проверка, достигли ли мы конца списка компаний
        if (scrollTop + clientHeight >= scrollHeight && nextIndex < allCompanies.length) {
            // Загрузка следующей порции компаний
            const endIndex = nextIndex + 100;
            const newCompanies = allCompanies.slice(nextIndex, endIndex);
            nextIndex = endIndex;
            visibleCompanies = [...visibleCompanies, ...newCompanies];

            newCompanies.forEach(company => {
                const inn = company.inn;
                const yPred = company.y_pred;
                const li = document.createElement("li");

                const innText = document.createElement("p");
                innText.innerText = `ИНН: ${inn}`;
                innText.style.fontFamily = "Arial, sans-serif";
                innText.style.fontSize = "16px";
                innText.style.color = "#333";
                li.appendChild(innText);

                const yPredText = document.createElement("p"); // Добавляем значение y_pred для каждой компании
                yPredText.innerText = `Насколько успешно выполнит заказ: ${yPred}`;
                yPredText.style.fontFamily = "Arial, sans-serif";
                yPredText.style.fontSize = "14px";
                yPredText.style.color = "#777";
                li.appendChild(yPredText); // Добавляем значение в список
                const detailsButton = document.createElement("button"); // Создаем кнопку "Подробнее"
                detailsButton.innerText = "Подробнее"; // Устанавливаем текст кнопки
                detailsButton.style.marginLeft = "auto"; // Добавляем отступ слева для кнопки
                detailsButton.addEventListener("click", () => { // Добавляем обработчик нажатия на кнопку
                    window.location.href = `company.html?inn=${inn}`; // Переходим на страницу компании с номером ИНН
                });
                li.appendChild(detailsButton); // Добавляем кнопку в список

                inputList.appendChild(li);
            });
        }
    }
}
});