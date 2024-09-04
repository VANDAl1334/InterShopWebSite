let favouriteProductsId;

getFavouriteProducts();

async function getFavouriteProducts() {

    if (sessionStorage.TokenKey == undefined) {
        return;
    }

    const response = await fetch(`/api/favourite`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + sessionStorage.TokenKey
            }
        });


    if (response.ok) {
        favouriteProductsId = await response.json();
    }
}

// Загрузка скидок
async function loadDiscounts() {

    const response = await fetch(`/api/Product?discountOnly=true`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (response.ok) {
        data = await response.json();
        generateDiscounts(data, "Акции");
    }
}

// загружает список товаров указанной категории
async function loadCategory(categoryId) {
    const response = await fetch(`/api/Product?categoryId=${categoryId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (response.ok) {
        data = await response.json();
        generateDiscounts(data, data[0]['categoryName']);
    }
}

function generateDiscounts(jsonData, sectionName) {

    var root = document.getElementById("content");

    const discountLabel = document.createElement("p");
    discountLabel.innerHTML = sectionName;
    discountLabel.setAttribute("class", "label");

    const discounts = document.createElement("div");
    discounts.setAttribute("class", "discounts");

    root.appendChild(discountLabel);
    root.appendChild(discounts);

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

            if(sessionStorage.TokenKey == undefined)
            {
                alert("Для добавления товара в избранное необходимо войти в какаунт");
                return;
            }

            let favouriteProductId = Number(e.currentTarget.parentElement.id);

            if (favouriteProductsId.includes(favouriteProductId)) {
                let index = favouriteProductsId.indexOf(favouriteProductId);
                favouriteProductsId.splice(index, 1);

                e.currentTarget.setAttribute("style", `background-image: url("../icons/Favourite_empty.png");`);
            }
            else {
                favouriteProductsId.push(favouriteProductId);
                e.currentTarget.setAttribute("style", `background-image: url("../icons/Favourite.png");`);
            }

            // Обновление списка избранных товаров
            const response = await fetch("/api/favourite", {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + sessionStorage.TokenKey
                },
                body: JSON.stringify(favouriteProductsId)
            });

            if (!response.ok) {
                console.log("[Favourite] Status: " + response.status);
            }
        });
        if (sessionStorage.TokenKey != undefined) {
            if (favouriteProductsId.includes(jsonData[i]["id"])) {
                toFavourite.setAttribute("style", `background-image: url("../icons/Favourite.png");`);
            }
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

        discounts.append(container);
    }
}

loadDiscounts();

// Загрузка секций с товарами определённой категории
// В дальнейшем предполагается получение id категорий с сервера
loadCategory(8);
loadCategory(9);