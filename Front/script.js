// Загрузка CSV-файла и вывод названий компаний
Papa.parse("data.csv", {
  download: true,
  header: true,
  delimiter: ",",
  dynamicTyping: true,
  complete: function(results) {
    var companies = results.data;
    var companyList = document.getElementById("company-list");
    for (var i = 0; i < companies.length; i++) {
      var name = companies[i].name;
      var li = document.createElement("li");
      var input = document.createElement("input");
      input.type = "text";
      input.value = name;
      li.appendChild(input);
      companyList.appendChild(li);
    }
  }
});
