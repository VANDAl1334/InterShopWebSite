async function getProduct(id) {
    let result;

    const response = await fetch(`/api/product/${id}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + sessionStorage.TokenKey
            }
        });


    if (response.ok) {
        result = await response.json();
    }

    return result;
}

async function getProducts(nameFilter, categoryId = 0, discountOnly = false) {
    let result;

    nameFilter = nameFilter === undefined ? "" : nameFilter;

    const response = await fetch(`/api/Product?nameFilter=${nameFilter}&categoryId=${categoryId}&discountOnly=${discountOnly}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (response.ok) {
        result = await response.json();
    }

    return result;
}

async function getFavouriteProducts(detailInfo = false) {
    let result;

    if (sessionStorage.TokenKey === undefined) {
        return;
    }
    const response = await fetch(`/api/favourite?productInfo=${detailInfo}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + sessionStorage.TokenKey
            }
        });


    if (response.ok) {
        result = await response.json();
    }

    return result;
}

async function createProductList(products, favouriteProducts) {
    var root = document.createElement("productList");
    root.setAttribute("id", "productList");

    for (let i = 0; i < products.length; i++) {
        // Контейнер товара 
        const container = document.createElement("div");
        // В качестве id контейнера задаём id товара
        container.setAttribute("id", products[i]["id"]);
        container.setAttribute("class", "productContainer");

        // Превью товара
        const preview = document.createElement("img");
        preview.setAttribute("src", `../images/products/${products[i]["previewPath"]}`)
        preview.setAttribute("class", "productPreview");
        container.appendChild(preview);

        // Название товара
        const name = document.createElement("p");
        name.innerHTML = products[i]["name"];
        name.setAttribute("class", "productName");
        // задаём обработчик нажатия
        name.addEventListener("click", async e => {
            e.preventDefault();

            location.href = `${location.origin}/product?productId=${e.currentTarget.parentElement.id}`;
        });

        // Описание товара
        const description = document.createElement("p");
        description.innerHTML = products[i]["description"];
        description.setAttribute("class", "productDescription");

        container.appendChild(name);
        container.appendChild(description);

        // Кнопка добавления в избранное
        const toFavourite = document.createElement("button");
        toFavourite.setAttribute("class", "productFavourite");
        toFavourite.addEventListener("click", async e => {
            e.preventDefault();

            if (sessionStorage.TokenKey == undefined) {
                alert("Для добавления товара в избранное необходимо войти в аккаунт");
                return;
            }

            let favouriteProductId = Number(e.currentTarget.parentElement.id);
            let favouriteSrc;

            if (favouriteProducts.includes(favouriteProductId)) {
                favouriteSrc = `background-image: url("../icons/Favourite_empty.png");`;

                let index = favouriteProducts.indexOf(favouriteProductId);
                favouriteProducts.splice(index, 1);
            }
            else {
                favouriteSrc = `background-image: url("../icons/Favourite.png");`;

                favouriteProducts.push(favouriteProductId);
            }

            const sameProducts = document.getElementsByClassName("productContainer");

            for (const element of sameProducts) {
                if (element.id == favouriteProductId) {
                    element.getElementsByClassName("productFavourite")[0]
                        .setAttribute('style', favouriteSrc);
                }
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

        if (sessionStorage.TokenKey != undefined) {
            if (favouriteProducts.includes(products[i]["id"])) {
                toFavourite.setAttribute("style", `background-image: url("../icons/Favourite.png");`);
            }
        }

        container.appendChild(toFavourite);

        // Блок для цены и цены по скидке
        const divCost = document.createElement("div");
        divCost.setAttribute("class", "divProductCost");

        // Цена без скидки
        const cost = document.createElement("span");

        var costValue = products[i]["price"];
        cost.innerHTML = `${costValue} руб.`;
        cost.setAttribute("class", "productCost");
        divCost.appendChild(cost);

        let discount = products[i]["discount"];

        var costDisount;
        // Если существует хотя бы одна скидка
        if (discount != 0) {

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

    return root;
}