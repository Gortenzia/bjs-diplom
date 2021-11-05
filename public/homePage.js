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

//Получение информации о пользователе 

ApiConnector.current((response) => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

//Получение текущих курсов валюты //+

const ratesBoard = new RatesBoard();
let getStocks = () => {
    ApiConnector.getStocks((response) => {
        if (!response.success) return
        ratesBoard.clearTable()
        ratesBoard.fillTable(response.data)
    })
}
setInterval(getStocks, 1000);

//Операции с деньгами //Пока не отображаются пополнения

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = () => {
    ApiConnector.addMoney({ currency, amount }, response => {
        if (!response.success) {
            addMoneyForm.showProfile(response.data);
            //В случае успешного запроса отобразите в профиле 
            //новые данные о пользователе из данных ответа от сервера(showProfile).-
            errorMessageBlock.setMessage(`Баланс успешно пополнен`);
        } else {
            errorMessageBlock.setMessage(`Произошла ошибка: ${response.error}`);
        }
    })
}

//Конвектирование валюты

addMoneyForm.conversionMoneyCallback = () => {
    ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, response => {
        if (!response.success) {
            ProfileWidget.showProfile(response.data);
            errorMessageBlock.setMessage(`Конвертация валют прошла успешно`);
        } else {
            errorMessageBlock.setMessage(`Произошла ошибка: ${response.error}`);
        }
    })
}

//перевод валюты
addMoneyForm.sendMoneyCallback = () => {
    ApiConnector.transferMoney({ to, currency, amount }, response => {
        if (!response.success) {
            ProfileWidget.showProfile(response.data);
            errorMessageBlock.setMessage(`Перевод валют прошел успешно`);
        } else {
            errorMessageBlock.setMessage(`Произошла ошибка: ${response.error}`);
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
        moneyManager.updateUsersList(response.data);
    }
})

//3

favoritesWidget.addUserCallback = () => {
    ApiConnector.addUserToFavorites({ id, name }, response => {
        if (!response.success) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(data);
            moneyManager.updateUsersList(response.data);
            favoritesMessageBox.setMessage(`Пользователь успешно добавлен!`)
        } else {
            favoritesMessageBox.setMessage(`Произошла ошибка: ${response.error}`)
        }
    })
}

//4

favoritesWidget.removeUserCallback = () => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if (!response.success) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(data);
            moneyManager.updateUsersList(response.data);
            favoritesMessageBox.setMessage(`Пользователь успешно удален!`)
        } else {
            favoritesMessageBox.setMessage(`Произошла ошибка: ${response.error}`)
        }
    })
}