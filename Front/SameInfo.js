function editDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(null));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }

  return dp[m][n];
}

function findSimilarCompanies(input, data) {
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

  const similarCompanies = data.filter(company => {
    const inn = company.inn;
    if (!inn) {
      return false;
    }
    const similarity = getSimilarity(input, inn.slice(1)) >= 0.5; // Проверка похожести по ИНН
    const okopfCode = company.okopf_code;
    const okopfSimilarity = okopfCode && getSimilarity(input, okopfCode) >= 0.5; // Проверка похожести по коду ОКОПФ
    const okvedCode = company.okved_basic_code;
    const okvedSimilarity = okvedCode && getSimilarity(input, okvedCode) >= 0.5; // Проверка похожести по коду ОКВЭД
    const regDate = company.reg_date;
    const regDateSimilarity = regDate && Math.abs(new Date(input).getTime() - new Date(regDate).getTime()) <= 2592000000; // Проверка похожести по дате регистрации (± 1 месяц)

    return similarity || okopfSimilarity || okvedSimilarity || regDateSimilarity;
  });

  return similarCompanies;
}

let companiesData; // определяем переменную в глобальном контексте

// Обработчик события клика на кнопку поиска
const searchButton = document.getElementById("search-button-2");
searchButton.addEventListener("click", function() {
  const input = document.getElementById("inn-input-2").value.trim();

  if (!companiesData) {
    alert("Данные не загружены. Попробуйте позже.");
    return;
  }

  // Поиск компаний с похожими данными
  const similarCompanies = findSimilarCompanies(input, companiesData);

  // Обработка результатов поиска и вывод списка
  const companyList = document.getElementById("company-list");
  companyList.innerHTML = ""; // очистка списка перед каждым поиском

  if (similarCompanies.length === 0) {
    companyList.innerHTML = "<li>Компании с похожими данными не найдены</li>";
  } else {
    let companiesList = "<ul>";
    similarCompanies.slice(0, 5).forEach(company => {
      companiesList += `<li>${company.inn}</li>`;
    });
    companiesList += "</ul>";
    companyList.innerHTML = companiesList;
  }
});

Papa.parse("data.csv", {
  download: true,
  header: true,
  complete: function(results) {
    companiesData = results.data;

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