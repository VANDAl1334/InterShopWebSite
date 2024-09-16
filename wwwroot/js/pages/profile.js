async function main() {

    var dataProfile = document.getElementsByClassName("dataProfile");

    var response = await fetch("/api/auth/Authorize", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.TokenKey}`
        }
    });

    if (response.ok) {
        var data = await response.json();
        dataProfile["login"].innerText = data.userJson.login;
        dataProfile["mail"].value = data.userJson.mail;
        if (data.userJson.instanseMail)
            document.getElementById("instanseMail").src = "../icons/check-mark.png";
        else
            document.getElementById("instanseMail").src = "../icons/close.png";
        document.getElementById("content").hidden = false;
    }
    else {
        document.getElementById("content").hidden = true;
        location.href = `${location.origin}/register`;
    }

    // ВЫХОД ИЗ ПОЛЬЗОВАТЕЛЯ
    document.getElementById("btnExit").addEventListener("click", function () {
        sessionStorage.clear();
        location.href = `${location.origin}/register`
    });

    // Изменение почты
    document.getElementById("changeMail").addEventListener("click", async e => {
        e.preventDefault();

        dataProfile["mail"].readOnly = false;
        document.getElementById("changeMail").style.visibility = "collapse";
        document.getElementById("saveChangeMail").style.visibility = "visible";
    })

    // Сброс пароля
    document.getElementById("resetPassword").addEventListener("click", async e => {
        e.preventDefault();
        //Перенос на страницу восстановления пароля
    })

    // Сохранить изменения в почте
    document.getElementById("saveChangeMail").addEventListener("click", async e => {
        e.preventDefault();
        if (validateMail(document.getElementById("mail")))
            return;
        changeMail = {
            mail: document.getElementById("mail").value
        }
        var response = await fetch(`/api/User?loginDTO=${dataProfile["login"].innerText}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.TokenKey}`
            },
            body: JSON.stringify(changeMail)
        })
        if (response.ok) {
            alert("Почта изменена");
            location.reload();
        }
        else {
            ParseHttpStatus(response);
        }
        location.reload();
    })

    // Удалить аккаунт
    document.getElementById("deleteUser").addEventListener("click", async e => {
        e.preventDefault();
        document.getElementById("deleteUser").style.visibility = "collapse";
        document.getElementById("deleteUserLabel").style.visibility = "visible";
        document.getElementById("deleteUserCancel").style.visibility = "visible";
        document.getElementById("deleteUserConfirm").style.visibility = "visible";
    })

    // Отменить удаление аккаунта
    document.getElementById("deleteUserCancel").addEventListener("click", async e => {
        e.preventDefault();
        document.getElementById("deleteUser").style.visibility = "visible";
        document.getElementById("deleteUserLabel").style.visibility = "collapse";
        document.getElementById("deleteUserCancel").style.visibility = "collapse";
        document.getElementById("deleteUserConfirm").style.visibility = "collapse";
    })

    // Подтвердить удаление аккаунта
    document.getElementById("deleteUserConfirm").addEventListener("click", async e => {
        e.preventDefault();
        var response = await fetch(`/api/User?loginDTO=${dataProfile["login"].innerText}&isDeleting=true`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.TokenKey}`
            },
        })
        ParseHttpStatus(response);
        location.reload();
    });

    // Избранное
    document.getElementById("profileFavourite").addEventListener("click", async e => {
        location.href = `${location.origin}/favourite`; 
    });

    // Корзина
    document.getElementById("profileBasket").addEventListener("click", async e => {
        location.href = `${location.origin}/basket`; 
    });

    // Заказы
    document.getElementById("profileOrders").addEventListener("click", async e => {
        location.href = `${location.origin}/orders`; 
    });
}