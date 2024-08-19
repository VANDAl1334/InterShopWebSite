const validatePassword = () => {
    let errmsg = document.getElementById("errmsgPassword");
    //let allah = new RegExp("^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? ]).*$")    
    errmsg.innerText = "";
    // if (validatepass(password.value)) {
    if (!/^.{9,}./.test(password.value)) {
        errmsg.innerText = "Минимум 10 символов";
        password.style.background = "red";
        return true;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z]).*$/.test(password.value)) {
        errmsg.innerText = "Верхний и нижний регистр букв";
        password.style.background = "red";
        return true;
    } else if (!/[!-/:-@[-`{-~]/.test(password.value)) {
        errmsg.innerText = "Требуются Спец символы";
        password.style.background = "red";
        return true;    
    } else if(!/^.+\d.+$/.test(password.value)) {
        errmsg.innerText = "Требуются цифры";
        password.style.background = "red";
        return true;
    }    
    else{
        errmsg.innerText = "";
        password.style.background = "white";
        return false;
    }
}
let validatemail = (mail) => {
    return mail.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateMail = (mail) => {
    let errmsg = document.getElementById("errmsgMail");

    if (validatemail(mail.value)) {
        errmsg.innerText = "";
        mail.style.background = "white";
        return false;
    } else {
        errmsg.innerText = "Введен неверный формат почты";
        mail.style.background = "red";
        return true;
    }
}

document.getElementById("submitRegister").addEventListener("click", async e => {
    e.preventDefault();


    let password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword").value;
    var login = document.getElementById("login").value;
    var mail = document.getElementById("mail");
    // Проверка соответствия введённых данных
    if (login.trim().length == 0) {
        errmsgLogin.innerText = "Заполните поле Логин"
        return;
    }
    else
        errmsgLogin.innerText = ""
    if (mail.value.trim().length == 0) {
        errmsgMail.innerText = "Заполните поле Mail"
        return;
    }
    else {
        errmsgMail.innerText = ""
        if (validateMail(mail))
            return;
    }
    if (password.value.trim().length == 0) {
        errmsgPassword.innerText = "Заполните поле Пароль"
        return;
    }
    else {
        errmsgPassword.innerText = ""
        if (validatePassword())
            return;
    }
    if (password.value !== confirmPassword) {
        errmsgPassword.innerText = "Пароли не совпадают"
        return;
    }
    else
        errmsgPassword.innerText = ""
    let loginJson = { login: login }
    const responseLoginExists = await fetch("/api/auth/LoginExists", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(loginJson)
    });
    if (!responseLoginExists.ok) {
        let boolerr = await ParseError(responseLoginExists);
        if (boolerr)
            errmsgLogin.innerText = "Неверные логин или пароль";
        return;
    }
    var pass = btoa(String.fromCharCode.apply(null, new Uint8Array(await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(document.getElementById("password").value)))));

    const user =
    {
        login: document.getElementById("login").value,
        password: pass,
        mail: document.getElementById("mail").value
    }

    let response = await fetch("/api/auth/Register", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        alert("Вы успешно зарегистрировались!");
        window.location.href = `${location.origin}/Login`;
    }
    else {
        await ParseError(response);
        console.log("Status: " + response.status);
    }
})

