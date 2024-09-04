var dataProfile = document.getElementsByClassName("dataProfile");
window.addEventListener('load', async () => {
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
        dataProfile["mail"].innerText = data.userJson.mail;
        if (data.userJson.instanseMail)
            document.getElementById("instanseMail").src = "../icons/check-mark.png";
        else
            document.getElementById("instanseMail").src = "../icons/close.png";
        document.getElementById("dataProfileList").hidden = false;
    }
    else {
        document.getElementById("dataProfileList").hidden = true;
        location.href = `${location.origin}/register`;
    }
})
document.getElementById("btnExit").addEventListener("click", function () {
    sessionStorage.clear();
    location.href = `${location.origin}/register`
});
document.getElementById("changeMail").addEventListener("click", async e => {
    e.preventDefault();

    dataProfile["mail"].hidden = true;
    document.getElementById("mail").hidden = false;
    document.getElementById("changeMail").hidden = true;
    document.getElementById("resetPassword").hidden = true;
    document.getElementById("saveChangeMail").hidden = false;
})
document.getElementById("resetPassword").addEventListener("click", async e => {
    e.preventDefault();
    //Перенос на страницу восстановления пароля
})
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
        // alert("Httpstatus: " + response["status"]);
    }
    dataProfile["mail"].hidden = false;
    document.getElementById("mail").hidden = true;
    document.getElementById("changeMail").hidden = false;
    document.getElementById("resetPassword").hidden = false;
    document.getElementById("saveChangeMail").hidden = true;
    location.reload();
})
document.getElementById("deleteUser").addEventListener("click", async e => {    
    e.preventDefault();
    document.getElementById("deleteUser").hidden = true;
    document.getElementById("deleteUserLabel").hidden = false;
    document.getElementById("deleteUserCancel").hidden = false;
    document.getElementById("deleteUserConfirm").hidden = false;
})
document.getElementById("deleteUserCancel").addEventListener("click", async e => {
    e.preventDefault();
    document.getElementById("deleteUser").hidden = false;
    document.getElementById("deleteUserLabel").hidden = true;
    document.getElementById("deleteUserCancel").hidden = true;
    document.getElementById("deleteUserConfirm").hidden = true;
})
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
})
