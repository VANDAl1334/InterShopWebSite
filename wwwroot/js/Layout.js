var ShopsHeader = document.getElementById("Shops");
var CatalogHeader = document.getElementById("Catalog");
var DiscountsHeader = document.getElementById("Discounts");
var ProfileHeader = document.getElementById("profile");
var BasketHeader = document.getElementById("basket");
var FavouriteHeader = document.getElementById("favourite");
var divFromHeader = document.getElementById("divFromHeader");
var header = document.getElementsByClassName("header-content");
onload = async () => {
    divFromHeader.style.marginTop = header[0].clientHeight.toString() + "px";
    if (/Catalog\b/.test(location.pathname)) { FocusHeader(CatalogHeader); return; }
    if (/Shops\b/.test(location.pathname)) { FocusHeader(ShopsHeader); return; }
    if (/Discounts\b/.test(location.pathname)) { FocusHeader(DiscountsHeader); return; }
    if (/Profile\b/.test(location.pathname)) { FocusHeader(ProfileHeader); return; }
    if (/Basket\b/.test(location.pathname)) { FocusHeader(BasketHeader); return; }
    if (/Favourite\b/.test(location.pathname)) { FocusHeader(FavouriteHeader); return; }    
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
// Загрузка товаров
async function loadProducts(nameFilter)
{
    nameFilter = nameFilter === undefined ? "" : nameFilter;
    const search = document.getElementById("tb_search");
    search.value = nameFilter;

    deletePreviousResults();

    const response = await fetch(`/api/Product?nameFilter=${nameFilter}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if(response.ok)
    {
        data = await response.json();
        generateProducts(data);
    }
}

// Удаление предыдущих результатов 
function deletePreviousResults()
{
    const root = document.getElementById("results");

    root.innerHTML = "";
}

// Создание списка товаров
async function generateProducts(jsonData)
{
    var root = document.getElementById("results");

    // Строка "Результаты поиска"
    const resultString = document.createElement("p");
    resultString.setAttribute("style", "font-size: 30px; margin: 10px;");
    resultString.innerHTML = "Результаты поиска";
    root.appendChild(resultString);

    // Количество найденых товаров
    const result = document.createElement("p");
    result.innerHTML = `Всего найдено ${jsonData.length} товаров`;
    result.setAttribute("style", "margin: 10px");

    root.append(result);

    for(let i = 0; i < jsonData.length; i++)
    {
        // Контейнер результатов 
        const container = document.createElement("div");
        // В качестве id контейнера задаём id товара
        container.setAttribute("id", jsonData[i]["id"]);
        container.setAttribute("class", "productContainer");

        // Превью товара
        const preview = document.createElement("img");
        preview.setAttribute("src", `../images/products/${jsonData[i]["previewPath"]}`)
        preview.setAttribute("class", "productPreview");
        container.appendChild(preview);
               
        // Название товара
        const name = document.createElement("p");
        name.innerHTML = jsonData[i]["name"];
        name.setAttribute("class", "productName");
        // задаём обработчик нажатия
        name.addEventListener("click", async e => {
            e.preventDefault();

            location.href = `${location.origin}/product?productId=${e.currentTarget.parentElement.id}`;
        });

        // Описание товара
        const description = document.createElement("p");
        description.innerHTML = jsonData[i]["description"];
        description.setAttribute("class", "productDescription");

        container.appendChild(name);        
        container.appendChild(description);   
        
        // Кнопка добавления в избранное
        const toFavourite = document.createElement("button");
        toFavourite.setAttribute("class", "productFavourite");
        
        container.appendChild(toFavourite);

        // Блок для цены и цены по скидке
        const divCost = document.createElement("div");
        divCost.setAttribute("class", "divProductCost");

        // Цена без скидки
        const cost = document.createElement("span");
        
        var costValue = jsonData[i]["productVariants"][0]["priceHistories"][0]["price"];
        cost.innerHTML = `${costValue} руб.`;
        cost.setAttribute("class", "productCost");
        divCost.appendChild(cost);

        let lastDiscount = jsonData[i]["discountHistories"][0];
        
        var costDisount;
        // Если существует хотя бы одна скидка
        if(lastDiscount != undefined)
        {
            let lastDiscountValue = jsonData[i]["discountHistories"][0]["discount"];
            const currentDate = new Date();
            
            // Проверяем вхождение текущей даты в диапазон скидки
            if(currentDate >= new Date(lastDiscount["dateFrom"]) && currentDate <= new Date(lastDiscount["dateTo"]))
            {
                // Если скидка входит в диапазон (действует), то формируем тег для скидки
                costDisount = document.createElement("span");
                costDisount.innerHTML = `${costValue - costValue * (lastDiscountValue / 100)} руб.`;
                costDisount.setAttribute("class", "productDiscount");
                cost.setAttribute("style", "color: rgb(180, 180, 180);text-decoration: line-through;");
                divCost.appendChild(costDisount);
            }
        }  
        
        container.appendChild(divCost);

        // Кнопка "В корзину"
        const btnBasket = document.createElement("btn");
        btnBasket.innerHTML = "В корзину"
        btnBasket.setAttribute("class", "productToBasket");
        container.appendChild(btnBasket);
                
        root.append(container);
    }
}

// Загружаем товары при загрузке страницы
loadProducts(getParam("nameFilter"));

function getParam(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }