Papa.parse("data.csv", {
  download: true,
  header: true,
  delimiter: ",",
  dynamicTyping: true,
  complete: function(results) {
    const allCompanies = results.data;
    let visibleCompanies = allCompanies.slice(0, 70); // первые 70 компаний
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
        // Получаем ИНН компании
        const inn = company.inn;

        // Находим компанию в массиве allCompanies
        const selectedCompany = allCompanies.find(c => c.inn === inn);

        // Создаем модальное окно и его содержимое
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";

        const modalContent = document.createElement("div");
        modalContent.style.backgroundColor = "#fff";
        modalContent.style.padding = "20px";
        modalContent.style.borderRadius = "5px";

        const innText = document.createElement("p");
        innText.innerText = `ИНН: ${selectedCompany.inn}`;
        modalContent.appendChild(innText);

        const okopfText = document.createElement("p");
        okopfText.innerText = `Код ОКОПФ: ${selectedCompany.okopf_code}`;
        modalContent.appendChild(okopfText);

        const okfsText = document.createElement("p");
        okfsText.innerText = `Код ОКФС: ${selectedCompany.okfs_code}`;
        modalContent.appendChild(okfsText);

        const oktmoText = document.createElement("p");
        oktmoText.innerText = `Код ОКТМО: ${selectedCompany.oktmo_reg_code}`;
        modalContent.appendChild(oktmoText);

        const okvedText = document.createElement("p");
        okvedText.innerText = `Код ОКВЭД: ${selectedCompany.okved_basic_code}`;
        modalContent.appendChild(okvedText);

        const regDateText = document.createElement("p");
        regDateText.innerText = `Дата регистрации: ${selectedCompany.registration_date}`;
        modalContent.appendChild(regDateText);

        const capitalText = document.createElement("p");
        capitalText.innerText = `Размер уставного капитала: ${selectedCompany.capital_size}`;
        modalContent.appendChild(capitalText);

        const avgStaffText = document.createElement("p");
        avgStaffText.innerText = `Среднесписочная численность сотрудников: ${selectedCompany.avg_staff_qty}`;
        modalContent.appendChild(avgStaffText);

        const procedureQtyText = document.createElement("p");
        procedureQtyText.innerText = `Количество процедур: ${selectedCompany.procedure_qty}`;
        modalContent.appendChild(procedureQtyText);

        const winQtyText = document.createElement("p");
        winQtyText.innerText = `Количество выигранных процедур: ${selectedCompany.win_qty}`;
        modalContent.appendChild(winQtyText);

        const excludeDateText = document.createElement("p");
        excludeDateText.innerText = `Дата исключения из реестра: ${selectedCompany.exclude_date}`;
        modalContent.appendChild(excludeDateText);

        const mspCategoryText = document.createElement("p");
        mspCategoryText.innerText = `Категория малого или среднего предпринимательства: ${selectedCompany.msp_category}`;
        modalContent.appendChild(mspCategoryText);

        const usnText = document.createElement("p");
        usnText.innerText = `Упрощенная система налогообложения: ${selectedCompany.usn_simlified_tax_system}`;
        modalContent.appendChild(usnText);

        const envdText = document.createElement("p");
        envdText.innerText = `Единый налог на вмененный доход: ${selectedCompany.envd_imputed_tax}`;
        modalContent.appendChild(envdText);

        const amountDueText = document.createElement("p");
        amountDueText.innerText = `Сумма задолженности по исполнительным документам: ${selectedCompany.amount_due}`;
        modalContent.appendChild(amountDueText);

        const contractPriceText = document.createElement("p");
        contractPriceText.innerText = `Стоимость заключенных контрактов: ${selectedCompany.contract_price_rub} руб.`;
        modalContent.appendChild(contractPriceText);

        const subcontractorText = document.createElement("p");
        subcontractorText.innerText = `Доля субподрядчиков в исполнении контрактов: ${selectedCompany.subcontractor_sum_percents}%`;
        modalContent.appendChild(subcontractorText);

        const executionEndDateText = document.createElement("p");
        executionEndDateText.innerText = `Дата завершения исполнения контрактов: ${selectedCompany.execution_end_date}`;
        modalContent.appendChild(executionEndDateText);

        const eDocExecutionCountText = document.createElement("p");
        eDocExecutionCountText.innerText = `Количество выполненных контрактов через ЕСИА: ${selectedCompany.e_doc_execution_count}`;
        modalContent.appendChild(eDocExecutionCountText);

        const yPredText = document.createElement("p");
        yPredText.innerText = `Насколько успешно выполнит заказ: ${selectedCompany.y_pred}`;
        modalContent.appendChild(yPredText);

        const closeButton = document.createElement("button"); // Создаем кнопку закрытия модального окна
        closeButton.innerText = "Закрыть"; // Устанавливаем текст кнопки
        closeButton.style.marginTop = "20px"; // Добавляем отступ сверху для кнопки
        closeButton.addEventListener("click", () => { // Добавляем обработчик нажатия на кнопку
          // Удаляем модальное окно из DOM
          modal.remove();
        });
        modalContent.appendChild(closeButton); // Добавляем кнопку в модальное окно

        modal.appendChild(modalContent); // Добавляем содержимое модального окна в него самого
        document.body.appendChild(modal); // Добавляем модальное окно в DOM
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
          yPredText.innerText = `y_pred: ${yPred}`;
          yPredText.style.fontFamily = "Arial, sans-serif";
          yPredText.style.fontSize = "14px";
          yPredText.style.color = "#777";
          li.appendChild(yPredText); // Добавляем значение в список

          const detailsButton = document.createElement("button"); // Создаем кнопку "Подробнее"
          detailsButton.innerText = "Подробнее"; // Устанавливаем текст кнопки
          detailsButton.style.marginLeft = "auto"; // Добавляем отступ слева для кнопки
          detailsButton.addEventListener("click", () => { // Добавляем обработчик нажатия на кнопку
            // Получаем ИНН компании
            const inn = company.inn;

            // Находим компанию в массиве allCompanies
            const selectedCompany = allCompanies.find(c => c.inn === inn);
          });
          li.appendChild(detailsButton); // Добавляем кнопку в список

          inputList.appendChild(li);
        });
          }
        }
    }
});




