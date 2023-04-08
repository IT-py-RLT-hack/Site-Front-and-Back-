const columnIndexes = {
    inn: 1,
    okopf_code: 2,
    okfs_code: 3,
    oktmo_reg_code: 4,
    avg_staff_qty: 5,
    procedure_qty: 6,
    win_qty: 7,
    exclude_date: 8,
    msp_category: 9,
    usn_simlified_tax_system: 10,
    envd_imputed_tax: 11,
    amount_due: 12,
    contract_price_rub: 13,
    subcontractor_sum_percents: 14,
    execution_end_date: 15,
    e_doc_execution_count: 16
};

const urlParams = new URLSearchParams(window.location.search);
const inn = urlParams.get("inn");

Papa.parse("data.csv", {
  download: true,
  header: true,
  delimiter: ",",
  dynamicTyping: true,
  complete: function(results) {
    const allCompanies = results.data;
    const company = allCompanies.find(c => c[columnIndexes.inn] === inn.toString());

    if (company) {
      // Если компания найдена, отображаем информацию о ней
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
    } else {
      // Если компания не найдена, выводим сообщение об ошибке
      console.error(`Компания с ИНН ${inn} не найдена`);
    }
  },
  error: function(error) {
    console.error(`Ошибка при чтении файла: ${error.message}`);
  }
});