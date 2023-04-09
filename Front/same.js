let data;

Papa.parse("data.csv", {
  download: true,
  header: true,
  complete: function(results) {
    data = results.data;
    function getSimilarity(str1, str2) {
      const longer = str1.length > str2.length ? str1 : str2;
      const shorter = str1.length > str2.length ? str2 : str1;
      const longerLength = longer.length;

      if (longerLength === 0) {
        return 1.0;
      }

      const distance = editDistance(longer, shorter);
      return (longerLength - distance) / parseFloat(longerLength);
    }

    function findSimilarCompanies(input, data) {
      const similarCompanies = data.filter(company => {
        const similarity = getSimilarity(input, company.inn.slice(1)) >= 0.5; // Проверка похожести по ИНН
        const okopfSimilarity = getSimilarity(input, company.okopf_code) >= 0.5; // Проверка похожести по коду ОКОПФ
        const okvedSimilarity = getSimilarity(input, company.okved_basic_code) >= 0.5; // Проверка похожести по коду ОКВЭД
        const regDateSimilarity = Math.abs(new Date(input).getTime() - new Date(company.reg_date).getTime()) <= 2592000000; // Проверка похожести по дате регистрации (± 1 месяц)

        return similarity || okopfSimilarity || okvedSimilarity || regDateSimilarity;
      });

      return similarCompanies;
    }

    // Обработчик события клика на кнопку поиска
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", function() {
      const input = document.getElementById("input").value.trim();

      if (!data) {
        alert("Данные не загружены. Попробуйте позже.");
        return;
      }

      // Поиск компаний с похожими данными
      const similarCompanies = findSimilarCompanies(input, data);

      // Обработка результатов поиска и вывод в модальном окне
      if (similarCompanies.length === 0) {
        alert("Компании с похожими данными не найдены");
      } else {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        const modalClose = document.createElement("span");
        modalClose.classList.add("close");
        modalClose.innerHTML = "×";
        modalClose.addEventListener("click", function() {
          modal.style.display = "none";
        });
        const modalList = document.createElement("ul");
        similarCompanies.forEach(company => {
          const companyName = `${company.n}, ИНН: ${company.inn}`;
          const companyDetails = `ОКОПФ: ${company.okopf_code}, ОКФС: ${company.okfs_code}, ОКТМО: ${company.oktmo_reg_code}, ОКВЭД: ${company.okved_basic_code}, Дата регистрации: ${company.reg_date}`;
          const modalItem = document.createElement("li");
          modalItem.innerHTML = `<b>${companyName}</b><br>${companyDetails}`;
          modalList.appendChild(modalItem);
        });
        modalContent.appendChild(modalClose);
        modalContent.appendChild(modalList);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        modal.style.display = "block";
      }
    });

    function formatDate(date) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }

    function parseDate(dateStr) {
      const parts = dateStr.split("-");
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const day = parseInt(parts[2]);
      return new Date(year, month, day);
    }

    function dateDiffInDays(a, b) {
      const MS_PER_DAY = 1000 * 60 * 60 * 24;
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc2 - utc1) / MS_PER_DAY);
    }

    // Здесь можно выполнить другие действия с данными
  }
});

// Другой код, использующий переменную "data"