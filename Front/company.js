const urlParams = new URLSearchParams(window.location.search);
const inn = urlParams.get("inn");

Papa.parse("data.csv", {
    download: true,
    header: true,
    delimiter: ",",
    dynamicTyping: true,
    complete: function(results) {
        const allCompanies = results.data;
        const company = allCompanies.find(c => c.inn === inn); // Находим компанию с нужным ИНН

        const companyInfo = document.getElementById("company-info");
        const innText = document.createElement("p");
        innText.innerText = `INN: ${company.inn}`; // Отображаем номер ИНН на странице
        companyInfo.appendChild(innText);

        // Отображаем остальную информацию о компании
        // ...

    }
});
