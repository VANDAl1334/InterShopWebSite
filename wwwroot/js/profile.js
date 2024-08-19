var dataProfile = document.getElementsByClassName("dataProfile");
window.addEventListener('load', async () =>  {
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
    }
    else
        document.getElementById("dataProfileList").hidden = true;
})