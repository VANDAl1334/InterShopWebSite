let validatemail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateEmail = (email) => {
    let errmsg = document.getElementById("errmsgEmail");

    if (validatemail(email.value)) {
        errmsg.innerText = "";
        email.style.background = "white";
        return false;
    } else {
        errmsg.innerText = "Введен неверный формат почты";
        email.style.background = "red";
        return true;
    }
}