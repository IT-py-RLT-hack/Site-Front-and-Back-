# ЭТО ПРОСТО НАРАБОТКА, ЕСЛИ ВДРУГ НЕ ПОЙДЕТ С JS

import csv

# Получаем ИНН компании из URL
inn = '123456789012' # Пример

# Открываем файл
with open('data.csv', newline='', encoding='utf-8') as csvfile:
    # Создаем объект reader для чтения CSV
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    # Пропускаем заголовок
    next(reader)
    # Ищем компанию с указанным ИНН
    company = None
    for row in reader:
        if row[1] == inn:
            company = {
                'name': row[0],
                'inn': row[1],
                'city': row[2],
                'create_date': row[3],
                'reg_date': row[4],
                'last_tender_date': row[5],
                'contract_value': row[6],
                'staff': row[7],
                'ban': row[8],
                'bidding_num': row[9],
                'wins_num': row[10],
                'not_executed_contracts': row[11],
                'terminated_contracts': row[12]
            }
            break

# Создаем HTML-страницу с информацией о компании
if company is not None:
    html = f"<h1>{company['name']}</h1>"
    html += "<table>"
    html += f"<tr><td>ИНН:</td><td>{company['inn']}</td></tr>"
    html += f"<tr><td>Город:</td><td>{company['city']}</td></tr>"
    html += f"<tr><td>Дата создания:</td><td>{company['create_date']}</td></tr>"
    html += f"<tr><td>Дата регистрации:</td><td>{company['reg_date']}</td></tr>"
    html += f"<tr><td>Дата последнего тендера:</td><td>{company['last_tender_date']}</td></tr>"
    html += f"<tr><td>Стоимость контракта:</td><td>{company['contract_value']}</td></tr>"
    html += f"<tr><td>Количество сотрудников:</td><td>{company['staff']}</td></tr>"
    html += f"<tr><td>Банкротство:</td><td>{company['ban']}</td></tr>"
    html += f"<tr><td>Количество участий в тендерах:</td><td>{company['bidding_num']}</td></tr>"
    html += f"<tr><td>Количество выигранных тендеров:</td><td>{company['wins_num']}</td></tr>"
    html += f"<tr><td>Количество невыполненных контрактов:</td><td>{company['not_executed_contracts']}</td></tr>"
    html += f"<tr><td>Количество прекращенных контрактов:</td><td>{company['terminated_contracts']}</td></tr>"
    html += "</table>"
else:
    html = "<h1>Компания не найдена</h1>"

# Выводим страницу
print(html)
