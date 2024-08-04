document.getElementById("submitRegister").addEventListener("click", async e => {
    e.preventDefault();



    // Валидозация полей
    var errors = validateFields();

    if (errors.length > 0) {
        var errrorMessage = "";
        errors.forEach(element => {
            errrorMessage += element + "\n";
        });

        alert(errrorMessage);
        return;
    }

    var pass = btoa(String.fromCharCode.apply(null, new Uint8Array(await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(document.getElementById("password").value)))));

    const obj =
    {
        login: document.getElementById("login").value,
        password: pass,
        email: document.getElementById("email").value
    }

    const response = await fetch("/api/auth/Register", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        }
    );

    if(response.ok)
    {
        alert("Вы успешно зарегистрировались!");
        window.location.replace("http://localhost/Login");
    }
    else
    {
        console.log("Status: " + response.status);
    }
})

function validateFields()
{
    let errors = [];

    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var login = document.getElementById("login").value;

    var email = document.getElementById("email").value;

    // Проверка соответствия введённых паролей
    if (password.trim().length == 0)
        errors.push("Заполните поле Пароль")
    if (password !== confirmPassword)
        errors.push("Пароли не совпадают");
    if (login.trim().length == 0)
        errors.push("Заполните поле Логин")
    if (email.trim().length == 0)
        errors.push("Заполните поле Email")

    return errors;
} 
