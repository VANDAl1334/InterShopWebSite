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
document.getElementById("btnExit").addEventListener("click", function() {
    sessionStorage.clear();
    location.href = `${location.origin}/register`
});
document.getElementById("changeMail").addEventListener("click", async e => {
    e.preventDefault();

    dataProfile["mail"].hidden = true;
    document.getElementById("mail").hidden = false;
})
document.getElementById("resetPassword").addEventListener("click", async e => {
    e.preventDefault();
    //Перенос на страницу восстановления пароля
})
// allah = {
//     id: 1,
//     login: "string",
//     mail: "tes@mail.ru",
//     password: "tes@mail.ru",
//     roleName: "Administrator",
//     instanseMail: true
//   }
//   var response = await fetch("/api/User/1",{
//    method: "PUT",
//       headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwiZXhwIjoxNzI0ODg3Mjc3LCJpc3MiOiJJbnRlclNob3AiLCJhdWQiOiJJbnRlclNob3BDbGllbnQifQ.xObbC1JquiXBd3HrNdhxeaw5qTyLpmhTZ9rtB6mN4Go`
//   },
//       body: JSON.stringify(allah)
  
//   })