'use strict'; //Подключите строгий режим выполнения кода. +

//Кнопка выхода +
const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
    ApiConnector.logout((response) => {
        if (response.success === true) {
            location.reload();
        }
    });
}

//Получение информации о пользователе //Не отображает имя и ID

ApiConnector.current((response) => {
    if (response.success === true) {
        ProfileWidget.showProfile(data); //в который передавайте данные ответа от сервера. 
        //?? Как правильно передать эти данные ?
    }
});

//Получение текущих курсов валюты //Не работает, таблица не появляется
const ratesBoard = new RatesBoard();

getStocks = () => { //Не понятно какую именно функцию создать
    ApiConnector.getStocks((response) => {
        if (response.success === true) {
            tableBody.clearTable();
        };
        tableBody.fillTable(data);
    })
}

setIntarval(ratesBoard.getStocks(), 1000);

//Операции с деньгами

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = () => {
    ApiConnector.addMoney({ currency, amount }, response => {
        //Используйте аргумент функции свойства addMoneyCallback для передачи данных data в запрос.??
        if (response.success === true) {
            ApiConnector.showProfile();
            moneyManager.setMessage(`Баланс успешно пополнен`);
        } else {
            moneyManager.setMessage(`Произошла ошибка: ${response.error}`);
        }
    })
}

//Конвектирование валюты

addMoneyForm.conversionMoneyCallback = () => {
    ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, response => {
        //Используйте аргумент функции свойства conversionMoneyCallback для передачи данных в запрос??
        if (response.success === true) {
            ApiConnector.showProfile();
            moneyManager.setMessage(`Конвертация валют прошла успешно`);
        } else {
            moneyManager.setMessage(`Произошла ошибка: ${response.error}`);
        }
    })
}

//перевод валюты
addMoneyForm.sendMoneyCallback = () => {
    ApiConnector.transferMoney({ to, currency, amount }, response => {
        //Используйте аргумент функции свойства sendMoneyCallback для передачи данных в запрос.??
        if (response.success === true) {
            ApiConnector.showProfile();
            moneyManager.setMessage(`Перевод валют прошел успешно`);
        } else {
            moneyManager.setMessage(`Произошла ошибка: ${response.error}`);
        }
    })
}


//Работа с избранным
//1

const favoritesWidget = new FavoritesWidget(); //Создайте объект типа FavoritesWidget+

//2

ApiConnector.getFavorites((response) => {
    if (response.success === true) {
        favoritesTableBody.clearTable();
        favoritesTableBody.fillTable(data);
        updateUsersList(data);
    }
})

//3

favoritesWidget.addUserCallback = () => {
    ApiConnector.addUserToFavorites({ id, name }, response => {
        //Используйте аргумент функции свойства addUserCallback для передачи данных пользователя в запрос. ??
        if (response.success === true) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(data);
            updateUsersList(data);
            favoritesMessageBox.setMessage(`Пользователь успешно добавлен!`)
        } else {
            favoritesMessageBox.setMessage(`Произошла ошибка: ${response.error}`)
        }
    })
}

//4

favoritesWidget.removeUserCallback = () => {
    ApiConnector.removeUserFromFavorites(id, response => {
        //Используйте аргумент функции свойства removeUserCallback для передачи данных пользователя в запрос.??
        if (response.success === true) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(data);
            updateUsersList(data);
            favoritesMessageBox.setMessage(`Пользователь успешно удален!`)
        } else {
            favoritesMessageBox.setMessage(`Произошла ошибка: ${response.error}`)
        }
    })
}