// Определяем URL для запроса
const url = 'companies.json';

// Выполняем AJAX-запрос для получения данных
const xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = function() {
  if (xhr.status === 200) {
    // Если запрос успешно выполнен, получаем данные из ответа
    const data = JSON.parse(xhr.responseText);
    // Выводим данные на страницу
    const list = document.getElementById('company-list');
    data.forEach(company => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `company.html?id=${company.inn}`;
      link.textContent = company.name;
      item.appendChild(link);
      list.appendChild(item);
    });
  } else {
    // Если запрос выполнен с ошибкой, выводим сообщение об ошибке
    console.error('Ошибка получения данных о компаниях', xhr.status);
  }
};
xhr.send();


// JavaScript-код для загрузки списка компаний на главной странице сайта
window.onload = function() {
    // Отправляем GET-запрос на сервер для получения списка компаний
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'companies.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Парсим ответ в формате JSON
                const companies = JSON.parse(xhr.responseText);
                // Получаем элемент списка компаний
                const companyList = document.getElementById('company-list');
                // Создаем элементы списка компаний и добавляем их на страницу
                companies.forEach(function(company) {
                    const companyItem = document.createElement('li');
                    const companyLink = document.createElement('a');
                    companyLink.href = 'company.html#' + company.name;
                    companyLink.textContent = company.name;
                    companyItem.appendChild(companyLink);
                    companyList.appendChild(companyItem);
                });
            } else {
                console.log('Ошибка получения списка компаний');
            }
        }
    };
    xhr.send(null);
};

// JavaScript-код для загрузки информации о компании на странице компании
window.onload = function() {
    // Получаем имя компании из URL
    const companyName = window.location.hash.substr(1);
    // Отправляем GET-запрос на сервер для получения информации о компании
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'companies.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Парсим ответ в формате JSON
                const companies = JSON.parse(xhr.responseText);
                // Находим компанию с указанным имен
                                const company = companies.find(function(c) {
                    return c.name === companyName;
                });
                if (company) {
                    // Получаем элементы информации о компании на странице
                    const companyTitle = document.getElementById('company-title');
                    const companyInn = document.getElementById('company-inn');
                    const companyCity = document.getElementById('company-city');
                    const companyCreateDate = document.getElementById('company-create-date');
                    const companyRegDate = document.getElementById('company-reg-date');
                    const companyLastTenderDate = document.getElementById('company-last-tender-date');
                    const companyContractValue = document.getElementById('company-contract-value');
                    const companyStaff = document.getElementById('company-staff');
                    const companyBan = document.getElementById('company-ban');
                    const companyBiddingNum = document.getElementById('company-bidding-num');
                    const companyWinsNum = document.getElementById('company-wins-num');
                    const companyNotExecutedContracts = document.getElementById('company-not-executed-contracts');
                    const companyTerminatedContracts = document.getElementById('company-terminated-contracts');
                    // Выводим информацию о компании на страницу
                    companyTitle.textContent = company.name;
                    companyInn.textContent = company.inn;
                    companyCity.textContent = company.city;
                    companyCreateDate.textContent = company.create_date;
                    companyRegDate.textContent = company.reg_date;
                    companyLastTenderDate.textContent = company.last_tender_date;
                    companyContractValue.textContent = company.contract_value;
                    companyStaff.textContent = company.staff;
                    companyBan.textContent = company.ban;
                    companyBiddingNum.textContent = company.bidding_num;
                    companyWinsNum.textContent = company.wins_num;
                    companyNotExecutedContracts.textContent = company.not_executed_contracts;
                    companyTerminatedContracts.textContent = company.terminated_contracts;
                } else {
                    console.log('Компания не найдена');
                }
            } else {
                console.log('Ошибка получения информации о компании');
            }
        }
    };
    xhr.send(null);
};

