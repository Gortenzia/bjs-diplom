'use strict'; //Подключите строгий режим выполнения кода. +
//Авторизация +

const userForm = new UserForm(); //Создайте объект класса UserForm. +

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success === true) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(`Произошла ошибка: ${response.error}`);
        }
    });
};


//Регистрация +

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if (response.success === true) {
            userForm.data = date// присвоить userForm.id = id из ответа (?)
            location.reload();// перезагрузить страницу+
        } else {
            userForm.setRegisterErrorMessage(`Произошла ошибка: ${response.error}`);
        }
    });
}