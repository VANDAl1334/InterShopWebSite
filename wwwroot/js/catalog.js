let favouriteProducts;

getFavouriteProducts();

async function getFavouriteProducts() {
    const response = await fetch(`/api/favourite`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + sessionStorage.TokenKey
            }
        });


    if (response.ok) {
        favouriteProducts = await response.json();
    }
}

// Загрузка товаров
async function loadProducts(nameFilter) {
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

    if (response.ok) {
        data = await response.json();
        generateProducts(data);
    }
}

// Удаление предыдущих результатов 
function deletePreviousResults() {
    const root = document.getElementById("results");

    root.innerHTML = "";
}

// Создание списка товаров
async function generateProducts(jsonData) {
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

    for (let i = 0; i < jsonData.length; i++) {
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
        toFavourite.addEventListener("click", async e => {
            e.preventDefault();

            let favouriteProductId = Number(e.currentTarget.parentElement.id);

            if (favouriteProducts.includes(favouriteProductId)) {
                let index = favouriteProducts.indexOf(favouriteProductId);
                favouriteProducts.splice(index, 1);

                e.currentTarget.setAttribute("style", `background-image: url("../icons/Favourite_empty.png");`);
            }
            else {
                favouriteProducts.push(favouriteProductId);
                e.currentTarget.setAttribute("style", `background-image: url("../icons/Favourite.png");`);
            }

            // Обновление списка избранных товаров
            const response = await fetch("/api/favourite", {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + sessionStorage.TokenKey
                },
                body: JSON.stringify(favouriteProducts)
            });

            if (!response.ok) {
                console.log("[Favourite] Status: " + response.status);
            }
        });
        if (!favouriteProducts.includes(jsonData[i]["id"])) {
            toFavourite.setAttribute("style", `background-image: url("../icons/Favourite_empty.png");`);
        }

        container.appendChild(toFavourite);

        // Блок для цены и цены по скидке
        const divCost = document.createElement("div");
        divCost.setAttribute("class", "divProductCost");

        // Цена без скидки
        const cost = document.createElement("span");

        var costValue = jsonData[i]["price"];
        cost.innerHTML = `${costValue} руб.`;
        cost.setAttribute("class", "productCost");
        divCost.appendChild(cost);

        let discount = jsonData[i]["discount"];

        var costDisount;
        // Если существует хотя бы одна скидка
        if (discount != undefined) {

            costDisount = document.createElement("span");
            costDisount.innerHTML = `${costValue - costValue * (discount / 100)} руб.`;
            costDisount.setAttribute("class", "productDiscount");
            cost.setAttribute("style", "color: rgb(180, 180, 180);text-decoration: line-through;");
            divCost.appendChild(costDisount);
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
let nameFilter = getParam("nameFilter");
loadProducts(nameFilter);
document.getElementById("tb_search").innerText = nameFilter;

function getParam(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}