var tokenKey = "";
document.getElementById("showPassword").addEventListener("change", () => {
    let btnShow = document.getElementById("showPassword");
    let password = document.getElementById("password");
    if (btnShow.checked) {
        password.type = 'text';
        btnShow.style.background = '#2c2c2c';
    }
    else {        
        password.type = 'password';
        btnShow.style.background = 'transparent';
    }
});
document.getElementById("submitLogin").addEventListener("click", async e => {
    e.preventDefault();
    let login = document.getElementById("login");
    let password = document.getElementById("password");
    let errmsgPass = document.getElementById("errmsgPassAuth")
    let errmsgLogin = document.getElementById("errmsgLoginAuth")
    if (!login.value.trim()) {
        errmsgLogin.innerText = "Обязательное поле"
        return;
    }
    else
        errmsgLogin.innerText = "";
    if (!password.value.trim()) {
        errmsgPass.innerText = "Обязательное поле"
        return;
    }
    else
        errmsgPass.innerText = "";
    const authUser =
    {
        login: login.value,
        password: btoa(String.fromCharCode.apply(null, new Uint8Array(await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(password.value)))))
    }

    const responseAuth = await fetch("/api/auth/Login", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(authUser)
    });

    // если запрос прошел нормально
    if (responseAuth.ok) {
        // получаем данные
        const data = await responseAuth.json();
        // сохраняем в хранилище sessionstorage значение ключа
        // document.cookie = `login=${data.userData.login}; mail=${data.userData.mail}`
        sessionStorage.setItem("TokenKey", data.accessToken);
        location.href = location.origin;
    }
    else {
        console.log(responseAuth);
        let boolerr = await ParseError(responseAuth);
        if (boolerr)
            errmsgLogin.innerText = "Неверные логин или пароль";
        return;
    }
})

// document.getElementById("submitGetData").addEventListener("click", async e =>
// {
//     e.preventDefault();
//     // получаем токен из sessionStorage
//     const token = sessionStorage.getItem("TokenKey");
//     // отправляем запрос на получение данных
//     const response = await fetch("/api/auth", {
//         method: "GET",
//         headers: {
//             "Accept": "application/json",
//             "Authorization": "Bearer " + token // передача токена в заголовке запроса
//         }
//     });

//     if(response.ok === true)
//     {
//         const data = await response.json();
//         alert(data);
//     }
//     else
//         console.log("Status: ", response.status);
// });
