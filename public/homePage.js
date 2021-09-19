'use strict'; //Подключите строгий режим выполнения кода. +

const userForm = new UserForm(); //Создайте объект класса UserForm. +

userForm.loginFormCallback = data => ApiConnector.login({ login, password }, callback => current(callback));
//Передайте в запрос авторизации функцию, которая будет 
//выполняться при попытке авторизации. ??Не совсем понятно куда registerFormCallback() должно быть передано??
console.log(data); //Посмотрите в консоли, какой объект возвращает сервер +


try {
    loginFormAction()
    if (!userForm.loginFormCallback() === undefined)
        location.reload();
} catch (err) {
    setLoginErrorMessage(message);
}


userForm.registerFormCallback = data => ApiConnector.register({ login, password }, callback => current(callback));
//registerFormCallback() - так же, не понятно куда конкретно вставить и почему

try {
    registerFormAction()
    if (!userForm.registerFormCallback() === undefined)
        location.reload();
} catch (err) {
    setRegisterErrorMessage(message);
}