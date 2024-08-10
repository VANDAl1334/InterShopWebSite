async function ParseError(response) {
    let resJson = await response.json();
    return getKeysWithValues(resJson);
}
function getKeysWithValues(response) {
    let errormsg = document.getElementsByClassName("errormsg");
    var boolean;
    if (response.errors)
        for (let key in response.errors) {
            response.errors[key].forEach((msg) => {
                errormsg[key].innerText = msg;
                boolean = msg
            });
        }
    if (boolean)
        return false;
    return true;
}
