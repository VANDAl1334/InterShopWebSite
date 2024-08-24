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
        location.href = `${location.origin}/Register`;
    }
})