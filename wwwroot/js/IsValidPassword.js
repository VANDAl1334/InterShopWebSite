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