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