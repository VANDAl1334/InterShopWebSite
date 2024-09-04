var ShopsHeader = document.getElementById("Shops");
var CatalogHeader = document.getElementById("Catalog");
var DiscountsHeader = document.getElementById("Discounts");
var ProfileHeader = document.getElementById("profile");
var BasketHeader = document.getElementById("basket");
var FavouriteHeader = document.getElementById("favourite");
var divFromHeader = document.getElementById("divFromHeader");
var header = document.getElementsByClassName("header-content");
var response;
onload = async () => {
    divFromHeader.style.marginTop = header[0].clientHeight.toString() + "px";
    if (/catalog\b/.test(location.pathname)) { FocusHeader(CatalogHeader); return; }
    if (/shops\b/.test(location.pathname)) { FocusHeader(ShopsHeader); return; }
    if (/discounts\b/.test(location.pathname)) { FocusHeader(DiscountsHeader); return; }
    if (/profile\b/.test(location.pathname)) { FocusHeader(ProfileHeader); return; }
    if (/basket\b/.test(location.pathname)) { FocusHeader(BasketHeader); return; }
    if (/favourite\b/.test(location.pathname)) { FocusHeader(FavouriteHeader); return; }
}
function FocusHeader(chapter) {
    chapter.style.background = "#797979";
    chapter.style.color = "#ffffff";
    chapter.style.borderRadius = "15px";
}
FavouriteHeader.addEventListener("click", async e => {
    e.preventDefault();

    window.location.href = `${location.origin}/favourite`;
})

BasketHeader.addEventListener("click", async e => {
    e.preventDefault();
    window.location.href = `${location.origin}/basket`;
})

ProfileHeader.addEventListener("click", async e => {
    e.preventDefault();

    window.location.href = `${location.origin}/profile`;
})

// Кнопка поиска
document.getElementById("btn_search").addEventListener("click", async e => {
    e.preventDefault();
    const search = document.getElementById("tb_search");
    loadProducts(search.value);
    location.href = `${location.origin}/catalog?nameFilter=${search.value}`;
    // history.pushState(null, "", `${location.origin}/Catalog?nameFilter=${search.value}`); // переход на страницу без ее обновления
    // FocusHeader("Catalog");    
});
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

function getParam(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))

        return decodeURIComponent(name[1]);
}

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
        errmsg.style.color = "red";
        mail.style.background = "red";
        return true;
    }
}
function ParseHttpStatus(response) {
    if (response.status >= 500)
        alert(`${response.statusText} ${response.status} Оллах не отвичает жыдким`)
    else if (response.status >= 400)
        alert(response.statusText + " " + response.status)
}