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

        // Создаем элементы для отображения информации
        const innText = document.createElement("p");
        innText.innerText = `INN: ${company.inn}`;
        companyInfo.appendChild(innText);

        const staffQtyText = document.createElement("p");
        staffQtyText.innerText = `Количество сотрудников: ${company.avg_staff_qty}`;
        companyInfo.appendChild(staffQtyText);

        const procQtyText = document.createElement("p");
        procQtyText.innerText = `Среднее количество процедур: ${company.procedure_qty}`;
        companyInfo.appendChild(procQtyText);
    }
});
