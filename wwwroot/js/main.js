var ShopsHeader;
var CatalogHeader;
var DiscountsHeader;
var ProfileHeader;
var BasketHeader;
var FavouriteHeader;
var content;
var header;
var response;

// Подключение jquery на страницы сайта
const jquery = document.createElement("script");
jquery.setAttribute("src", "../lib/jquery/dist/jquery.min.js");
document.body.appendChild(jquery);

window.onload = async e => {

    e.preventDefault();

    $.ajaxSetup({ cache: false });
    // Загрузка футера
    await $("#footerContainer").load("../footer.html");

    // Загрузка хедера
    await $("#headerContainer").load("../header.html", function () {

        ShopsHeader = document.getElementById("Shops");
        CatalogHeader = document.getElementById("Catalog");
        DiscountsHeader = document.getElementById("Discounts");
        ProfileHeader = document.getElementById("profile");
        BasketHeader = document.getElementById("basket");
        FavouriteHeader = document.getElementById("favourite");
        header = document.getElementsByClassName("header-content");

        setEventListeners();

        content = document.getElementById("content");

        content.style.marginTop = header[0].clientHeight.toString() + "px";

        main();

        if (/catalog\b/.test(location.pathname)) { FocusHeader(CatalogHeader); return; }
        if (/shops\b/.test(location.pathname)) { FocusHeader(ShopsHeader); return; }
        if (/discounts\b/.test(location.pathname)) { FocusHeader(DiscountsHeader); return; }
        if (/profile\b/.test(location.pathname)) { FocusHeader(ProfileHeader); return; }
        if (/basket\b/.test(location.pathname)) { FocusHeader(BasketHeader); return; }
        if (/favourite\b/.test(location.pathname)) { FocusHeader(FavouriteHeader); return; }

        
    });
};

function FocusHeader(chapter) {
    chapter.style.background = "#797979";
    chapter.style.color = "#ffffff";
    chapter.style.borderRadius = "15px";
}

function setEventListeners() {

    // Кнопка "Избранное"
    FavouriteHeader.addEventListener("click", async e => {
        e.preventDefault();

        window.location.href = `${location.origin}/favourite`;
    })

    // Кнопка "Корзина"
    BasketHeader.addEventListener("click", async e => {
        e.preventDefault();
        window.location.href = `${location.origin}/basket`;
    })

    // Кнопка "Профиль"
    ProfileHeader.addEventListener("click", async e => {
        e.preventDefault();

        window.location.href = `${location.origin}/profile`;
    })

    // Кнопка поиска
    document.getElementById("btn_search").addEventListener("click", async e => {
        e.preventDefault();
        const search = document.getElementById("tb_search");
        location.href = `${location.origin}/catalog?nameFilter=${search.value}`;
    });
}

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

// Метод для получения значения параметра из адресной строки
function getParam(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}