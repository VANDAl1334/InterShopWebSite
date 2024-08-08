document.getElementById("submitRegister").addEventListener("click", async e => {
    e.preventDefault();


    let password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword").value;
    var login = document.getElementById("login").value;
    var email = document.getElementById("email");
    // Проверка соответствия введённых данных
    if (login.trim().length == 0) {
        errmsgLogin.innerText = "Заполните поле Логин"
        return;
    }
    else
        errmsgLogin.innerText = ""
    if (email.value.trim().length == 0) {
        errmsgEmail.innerText = "Заполните поле Email"
        return;
    }
    else {
        errmsgEmail.innerText = ""
        if (validateEmail(email))
            return;
    }
    if (password.value.trim().length == 0) {
        errmsgPassword.innerText = "Заполните поле Пароль"
        return;
    }
    else {
        errmsgPassword.innerText = ""
        if(validatePassword())
            return;
    }
    if (password.value !== confirmPassword) {
        errmsgPassword.innerText = "Пароли не совпадают"
        return;
    }
    else
        errmsgPassword.innerText = ""

    var pass = btoa(String.fromCharCode.apply(null, new Uint8Array(await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(document.getElementById("password").value)))));

    const obj =
    {
        login: document.getElementById("login").value,
        password: pass,
        mail: document.getElementById("email").value
    }

    const response = await fetch("/api/auth/Register", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    }
    );

    if (response.ok) {
        location.origin
        alert("Вы успешно зарегистрировались!");
        window.location.href = `${location.origin}/Login`;
    }
    else {
        console.log("Status: " + response.status);
    }
})

