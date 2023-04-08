const columnIndexes = {
    inn: 1,
    okopf_code: 2,
    okfs_code: 3,
    oktmo_reg_code: 4,
    okved_basic_code: 5,
    registration_date: 6,
    capital_size: 7,
    avg_staff_qty: 8,
    procedure_qty: 9,
    win_qty: 10,
    exclude_date: 11,
    msp_category: 12,
    usn_simlified_tax_system: 13,
    envd_imputed_tax: 14,
    amount_due: 15,
    contract_price_rub: 16,
    subcontractor_sum_percents: 17,
    execution_end_date: 18,
    e_doc_execution_count: 19
};

const urlParams = new URLSearchParams(window.location.search);
const inn = urlParams.get("inn");

if (!inn) {
    console.error("Отсутствует параметр INN");
}

Papa.parse("data.csv", {
    download: true,
    header: true,
    delimiter: ",",
    dynamicTyping: true,
    complete: function(results) {
        const allCompanies = results.data;

        // Функция, которая отображает информацию о компании на странице компании
        function showCompanyInfo(company) {
            const companyInfo = document.getElementById("company-info");

            const innText = document.createElement("p");
            innText.innerText = `INN: ${company[columnIndexes.inn]}`;
            companyInfo.appendChild(innText);

            const staffQtyText = document.createElement("p");
            staffQtyText.innerText = `Количество сотрудников: ${company[columnIndexes.avg_staff_qty]}`;
            companyInfo.appendChild(staffQtyText);

            const procQtyText = document.createElement("p");
            procQtyText.innerText = `Среднее количество процедур: ${company[columnIndexes.procedure_qty]}`;
            companyInfo.appendChild(procQtyText);
        }

        // Функция, которая отображает список компаний на главной странице
        function showCompanyList(companies) {
            const companyList = document.getElementById("company-list");

            companies.forEach(company => {
                const inn = company[columnIndexes.inn];
                const li = document.createElement("li");

                const innText = document.createElement("p");
                innText.innerText = `ИНН: ${inn}`;
                innText.style.fontFamily = "Arial, sans-serif";
                innText.style.fontSize = "16px";
                innText.style.color = "#333";
                li.appendChild(innText);

                const detailsButton = document.createElement("button");
                detailsButton.innerText = "Подробнее";
                detailsButton.style.marginLeft = "auto";
                detailsButton.addEventListener("click", () => {
                    window.location.href = `company.html?inn=${inn}`;
                });
                li.appendChild(detailsButton);

                companyList.appendChild(li);
            });
        }

        if (inn) {
            // Если передан параметр INN, ищем компанию с соответствующим ИНН на странице компании
            const company = allCompanies.find(c => c[columnIndexes.inn] === inn.toString());

            if (company) {
                showCompanyInfo(company);
            } else {
                console.error(`Компания с ИНН ${inn} не найдена`);
            }
        } else {
            // Если параметр INN не передан, отображаем список компаний на главной странице
            let visibleCompanies = allCompanies.slice(0, 70);
            let nextIndex = 70;

            showCompanyList(visibleCompanies);

            window.addEventListener("scroll", handleScroll);

            function handleScroll() {
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

                if (scrollTop + clientHeight >= scrollHeight && nextIndex < allCompanies.length) {
                    const endIndex = nextIndex + 100;
                    const newCompanies = allCompanies.slice(nextIndex, endIndex);
                    nextIndex = endIndex;
                    visibleCompanies = [...visibleCompanies, ...newCompanies];

                    showCompanyList(newCompanies);
                }
            }
        }
    },
    error: function(error) {
        console.error(`Ошибка при чтении файла: ${error.message}`);
    }
});
