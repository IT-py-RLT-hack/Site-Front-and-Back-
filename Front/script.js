Papa.parse("data.csv", {
    download: true,
    header: true,
    delimiter: ",",
    dynamicTyping: true,
    complete: function(results) {
        const allCompanies = results.data;
        let visibleCompanies = allCompanies.slice(0, 100); // первые 100 компаний
        let nextIndex = 100; // индекс следующей компании, которая должна быть загружена

        const companyList = document.getElementById("company-list");
        const inputList = document.createElement("div");
        companyList.appendChild(inputList);

        visibleCompanies.forEach(company => {
            const inn = company.inn;
            const li = document.createElement("li");

            const detailsButton = document.createElement("button"); // Создаем кнопку "Подробнее"
            detailsButton.innerText = "Подробнее"; // Устанавливаем текст кнопки
            detailsButton.addEventListener("click", () => { // Добавляем обработчик нажатия на кнопку
                window.location.href = `company.html?inn=${inn}`; // Переходим на страницу компании с номером ИНН
            });
            li.appendChild(detailsButton); // Добавляем кнопку в список

            const input = document.createElement("input");
            input.type = "text";
            input.value = inn;
            li.appendChild(input);

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
                    const li = document.createElement("li");
                    const input = document.createElement("input");
                    input.type = "text";
                    input.value = inn;
                    li.appendChild(input);
                    inputList.appendChild(li);
                });
            }
        }
    }
});


visibleCompanies.forEach(company => {
    const inn = company.inn;
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "text";
    input.value = inn;
    li.appendChild(input);

    const detailsButton = document.createElement("button"); // Создаем кнопку "Подробнее"
    detailsButton.innerText = "Подробнее"; // Устанавливаем текст кнопки
    detailsButton.addEventListener("click", () => { // Добавляем обработчик нажатия на кнопку
        window.location.href = `company.html?inn=${inn}`; // Переходим на страницу компании с номером ИНН
    });
    li.appendChild(detailsButton); // Добавляем кнопку в список

    inputList.appendChild(li);
});

