var tokenKey = "";

document.getElementById("submitLogin").addEventListener("click", async e => {
    e.preventDefault();

    const obj =
    {
        login: document.getElementById("login").value,
        password: btoa(String.fromCharCode.apply(null, new Uint8Array(await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(document.getElementById("password").value)))))
    }

    const response = await fetch("/api/auth/Login", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    });

    // если запрос прошел нормально
    if(response.ok === true)
    {
        // получаем данные
        const data = await response.json();
        // сохраняем в хранилище sessionstorage значение ключа
        sessionStorage.setItem("TokenKey", data.accessToken);

        window.location.replace("/");
    }
    else
    {
        console.log("Status: ", response.status);
        alert("Некорректный логин или пароль!");
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
